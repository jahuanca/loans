const { Op } = require("sequelize")
const Quota = require("../../quota/db/quota_model")
const { operationsOfLog } = require("../../utils/core/default_values")
const { addDays } = require("../../utils/core/helpers")
const PaymentFrequency = require("../../utils/db/payment_frequency_model")
const Loan = require("../db/loan_model")

const payQuota = async ({
    id_of_quota,
    paid_date,
    idUser,
    t,
}) => {
    const quota = await Quota.findByPk(id_of_quota, { transaction: t })
    const { id_loan, date_to_pay } = quota
    await _validatePendings({ id_loan, date_to_pay, t })
    quota.id_state_quota = 2
    quota.paid_date = paid_date
    quota.description_operation = operationsOfLog.PAY_QUOTA
    quota.idUser = idUser
    await quota.save({ transaction: t })
    await _setLoanComplete({ id_loan, idUser, t })
    return quota
}

const _setLoanComplete = async ({
    id_loan,
    idUser,
    t,
}) => {
    const count = await Quota.count({
        where: { id_loan: id_loan, id_state_quota: 1 },
        transaction: t,
    })
    if (count == 0) {
        const loan = await Loan.findByPk(id_loan, { transaction: t })
        loan.id_state_loan = 2
        loan.description_operation = operationsOfLog.COMPLETE_LOAN
        loan.idUser = idUser
        await loan.save({ transaction: t })
    }
}

const _validatePendings = async ({
    id_loan,
    date_to_pay,
    t
}) => {
    const countOfpendingQuotas = await Quota.count({
        where: {
            id_loan: id_loan,
            id_state_quota: 1,
            date_to_pay: {
                [Op.lt]: date_to_pay,
            }
        },
        transaction: t,
    })
    if (countOfpendingQuotas > 0) {
        throw Error('Existen cuotas pendientes que debe pagar antes que esta cuota.')
    }
}

const createLoan = async ({
    id_customer,
    id_user,
    id_payment_frequency,
    id_payment_method,
    amount,
    percentage,
    start_date,
    ganancy,
    observation,
    id_state_loan,
    evidence,
    t,
}) => {
    const loan = await Loan.create({
        id_customer,
        id_user,
        id_payment_frequency,
        id_payment_method,
        percentage,
        amount,
        start_date,
        ganancy,
        observation,
        id_state_loan: 1,
        evidence: 'ruta desconocida',
        description_operation: operationsOfLog.CREATE_LOAN,
        idUser: id_user,
    }, { transaction: t })

    const allAmount = amount * (percentage / 100 + 1)

    await _createQuotas({
        id_payment_frequency,
        id_loan: loan.id,
        start_date,
        allAmount,
        amount,
        t,
    })
    return loan
}

const _createQuotas = async ({
    id_payment_frequency,
    id_loan,
    start_date,
    allAmount,
    amount,
    t,
}) => {
    const frequency = await PaymentFrequency.findByPk(id_payment_frequency)
    const {
        days_installment,
        monthly_installments,
    } = frequency
    for (let i = 0; i < monthly_installments; i++) {
        const q = {
            name: `${(i + 1)}/${monthly_installments}`,
            description: '',
            id_loan,
            ganancy: (allAmount - amount) / monthly_installments,
            amount: allAmount / monthly_installments,
            date_to_pay: addDays(start_date, days_installment * (i + 1)),
            id_state_quota: 1,
        }
        await Quota.create(q, { transaction: t })
    }
}

module.exports = {
    payQuota,
    createLoan,
}