const { Op } = require("sequelize")
const Quota = require("../../quota/db/quota_model")
const { operationsOfLog, idQuotaStates, idLoanStates, typeRenewal, typeMovements } = require("../../utils/core/default_values")
const { addDays } = require("../../utils/core/helpers")
const PaymentFrequency = require("../../utils/db/models/payment_frequency_model")
const Loan = require("../db/loan_model")
const Renewal = require("../db/renewal_model")
const { models } = require("../../utils/db")
const { CapitalMovements } = models

const payQuota = async ({
    idOfQuota,
    paidDate,
    idUser,
    t,
}) => {
    const quota = await Quota.findByPk(idOfQuota, { transaction: t })
    const { idLoan, dateToPay, amount, ganancy } = quota
    const countOfpendingQuotas = await _validatePendings({ idLoan, dateToPay, t })
    if (countOfpendingQuotas > 0) {
        throw Error('Existen cuotas pendientes que debe pagar antes que esta cuota.')
    }
    quota.idStateQuota = idQuotaStates.COMPLETE
    quota.paidDate = paidDate
    quota.descriptionOperation = operationsOfLog.PAY_QUOTA
    quota.idUser = idUser
    
    await quota.save({ transaction: t })
    await createIncome({
        idLoan: idLoan,
        amount: amount,
        ganancy: ganancy,
        transaction: t,
    })
    await _setLoanComplete({ idLoan, idUser, t })
    return quota
}

const _setLoanComplete = async ({
    idLoan,
    idUser,
    t,
}) => {
    const count = await Quota.count({
        where: { idLoan: idLoan, idStateQuota: 1 },
        transaction: t,
    })
    if (count == 0) {
        const loan = await Loan.findByPk(idLoan, { transaction: t })
        loan.idStateLoan = idLoanStates.COMPLETE
        loan.descriptionOperation = operationsOfLog.COMPLETE_LOAN
        loan.idUser = idUser
        await loan.save({ transaction: t })
    }
}

const _validatePendings = async ({
    idLoan,
    dateToPay,
    t
}) => {
    const countOfpendingQuotas = await Quota.count({
        where: {
            idLoan: idLoan,
            idStateQuota: 1,
            dateToPay: {
                [Op.lt]: dateToPay,
            }
        },
        transaction: t,
    })
    return countOfpendingQuotas
}

const createIncome = async ({
    idLoan,
    amount,
    ganancy,
    transaction,
}) => {
    const total = amount + ganancy
    await CapitalMovements.create({
        type: typeMovements.INCOME,
        description: `INGRESO de capital ${amount} y ganancia ${ganancy}. TOTAL = ${total}, por préstamo P#${idLoan}.`,
        amount: amount,
        ganancy: ganancy,
        idLoan: idLoan,
        idUser: 1,
    }, {
        transaction: transaction,
    })
}

const createLoan = async ({
    idCustomer,
    idUser,
    idPaymentFrequency,
    idPaymentMethod,
    amount,
    percentage,
    startDate,
    ganancy,
    observation,
    idStateLoan,
    evidence,
    t,
}) => {

    const frequency = await PaymentFrequency.findByPk(idPaymentFrequency)
    const {
        monthlyInstallments,
        daysInstallment,
    } = frequency

    const loan = await Loan.create({
        idCustomer,
        idUser,
        idPaymentFrequency,
        idPaymentMethod,
        percentage,
        amount,
        startDate,
        ganancy,
        observation,
        idStateLoan: 1,
        evidence: 'ruta desconocida',
        descriptionOperation: operationsOfLog.CREATE_LOAN,
        idUser: idUser,

        numberOfInstallments: monthlyInstallments,
        daysBetweenInstallments: daysInstallment,
    }, { transaction: t })

    const allAmount = amount * (percentage / 100 + 1)

    await _createQuotas({
        frequency,
        idLoan: loan.id,
        startDate,
        allAmount,
        amount,
        t,
    })
    return loan
}

const _createQuotas = async ({
    frequency,
    idLoan,
    startDate,
    allAmount,
    amount,
    t,
}) => {

    const {
        daysInstallment,
        monthlyInstallments,
    } = frequency
    for (let i = 0; i < monthlyInstallments; i++) {
        const isLast = i == (monthlyInstallments -1)
        const q = {
            name: `${(i + 1)}/${monthlyInstallments}`,
            description: '',
            idLoan,
            ganancy: (allAmount - amount) / monthlyInstallments,
            amount: allAmount / monthlyInstallments,
            dateToPay: addDays(startDate, daysInstallment * (i + 1)),
            idStateQuota: 1,
            isLast: isLast,
        }
        await Quota.create(q, { transaction: t })
    }
}


const createLoanSpecial = async ({
    idCustomer,
    idUser,
    idPaymentFrequency,
    idPaymentMethod,
    amount,
    percentage,
    startDate,
    ganancy,
    observation,
    idStateLoan,
    evidence,

    numberOfInstallments,
    daysBetweenInstallments,
    t,
}) => {

    const loan = await Loan.create({
        idCustomer,
        idUser,
        idPaymentFrequency,
        idPaymentMethod,
        percentage,
        amount,
        startDate,
        ganancy,
        observation,
        idStateLoan: 1,
        evidence: 'ruta desconocida',
        descriptionOperation: operationsOfLog.CREATE_LOAN,
        idUser: idUser,

        numberOfInstallments: numberOfInstallments,
        daysBetweenInstallments: daysBetweenInstallments,
    }, { transaction: t })

    const allAmount = amount * (percentage / 100 + 1)

    await _createQuotasSpecial({
        numberOfInstallments,
        daysBetweenInstallments,
        idLoan: loan.id,
        startDate,
        allAmount,
        amount,
        t,
    })
    return loan
}

const _createQuotasSpecial = async ({
    numberOfInstallments,
    daysBetweenInstallments,
    idLoan,
    startDate,
    allAmount,
    amount,
    t,
}) => {

    for (let i = 0; i < numberOfInstallments; i++) {
        const isLast = i == (numberOfInstallments -1)

        const q = {
            name: `${(i + 1)}/${numberOfInstallments}`,
            description: '',
            idLoan,
            ganancy: (allAmount - amount) / numberOfInstallments,
            amount: allAmount / numberOfInstallments,
            dateToPay: addDays(startDate, daysBetweenInstallments * (i + 1)),
            idStateQuota: 1,
            isLast: isLast,
        }
        await Quota.create(q, { transaction: t })
    }
}

const createRenewal = async ({
    loan,
    idLoanToRenew,
    amount,
    idCustomer,
    idUser,
    t,
}) => {
    const { dataValues } = loan

    // ver como se hace cuando el prestamo es nuevo
    // entonces idLoanToRenew seria nulo
    // loanToRenew tambien
    // id y monto tambien, ver para enviarlos nulos.

    const loanToRenew = await Loan.findByPk(idLoanToRenew)
    const { id: idLast, amount: amountLast, } = loanToRenew?.dataValues

    const variationInAmount = amount - amountLast

    let idTypeRenewal = typeRenewal.SAME_AMOUNT
    if (variationInAmount > 0) { idTypeRenewal = typeRenewal.INCREASE }
    if (variationInAmount < 0) { idTypeRenewal = typeRenewal.DECREASE }

    await Renewal.create({
        idCustomer,
        idUser: idUser,
        idPreviousLoan: idLast,
        idNewLoan: dataValues.id,
        variationInAmount: variationInAmount,
        idTypeRenewal: idTypeRenewal,
    }, { transaction: t })
}

module.exports = {
    payQuota,
    createLoan,
    createLoanSpecial,
    createRenewal,
}