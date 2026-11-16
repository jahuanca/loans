const { typeRenewal } = require("../../../utils/core/default_values")
const { sequelize } = require("../../../utils/db/connection")
const Loan = require("../../db/loan_model")
const Renewal = require("../../db/renewal_model")
const { payQuota, createLoanSpecial } = require("../utils")

const payAndRenewalSpecialRepository = async ({
    idLoanToRenew,

    idOfQuota,
    paidDate,
    idUser,

    idCustomer,
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
}) => {
    const valueToReturn = await sequelize.transaction(async t => {
        const quotaPaid = await payQuota({
            idOfQuota,
            paidDate,
            idUser,
            t,
        })

        const loan = await createLoanSpecial({
            idCustomer,
            idUser: idUser,
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
        })

        await _createRenewal({
            loan,
            idLoanToRenew,
            amount,
            idCustomer,
            idUser,
            t,
        })

        return {
            quota: quotaPaid,
            loan: loan,
        }
    })
    return valueToReturn
}

const _createRenewal = async ({
    loan,
    idLoanToRenew,
    amount,
    idCustomer,
    idUser,
    t,
}) => {
    const { dataValues } = loan

    const loanToRenew = await Loan.findByPk(idLoanToRenew)
    const { id: idLast, amount: amountLast, } = loanToRenew.dataValues

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

module.exports = payAndRenewalSpecialRepository