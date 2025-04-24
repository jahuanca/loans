const Quota = require("../../quota/db/quota_model");
const { addDays } = require("../../utils/core/helpers");
const PaymentFrequency = require("../../utils/db/payment_frequency_model");
const Loan = require("../db/loan_model");

const createLoanRepository = async ({
    id_customer,
    id_user,
    id_payment_frequency,
    id_payment_method,
    amount,
    percentage,
    date,
    ganancy,
    observation,
    id_state_loan,
    evidence,
}) => {
    console.log(
        id_customer,
        id_payment_frequency,
        id_payment_method,
        amount,
        percentage,
        ganancy,
        id_state_loan,
    )
    const loan = await Loan.create({
        id_customer,
        id_user: 1,
        id_payment_frequency,
        id_payment_method,
        percentage,
        amount,
        date,
        ganancy,
        observation,
        id_state_loan: 1,
        evidence: 'ruta desconocida',
    })

    const allAmount = amount * (percentage / 100 + 1)

    await createQuotas({
        id_payment_frequency,
        id_loan: loan.id,
        date,
        allAmount,
        amount,
    })
    return loan
}

const createQuotas = async ({
    id_payment_frequency,
    id_loan,
    date,
    allAmount,
    amount,
}) => {
    const frequency = await PaymentFrequency.findByPk(id_payment_frequency)
    const {
        days_installment,
        monthly_installments,
    } = frequency
    for (let i = 0; i < monthly_installments; i++) {
        const quota = await Quota.create({
            name: `${(i + 1)}/${monthly_installments}`,
            description: '',
            id_loan,
            ganancy: (allAmount - amount) / monthly_installments,
            amount: allAmount / monthly_installments,
            date_to_pay: addDays(date, days_installment * (i + 1)),
            id_state_quota: 1,
        })
    }
}

module.exports = createLoanRepository