const Quota = require("./../../../quota/db/quota_model");
const { operationsOfLog } = require("./../../../utils/core/default_values");
const { addDays } = require("./../../../utils/core/helpers");
const { sequelize } = require("./../../../utils/db/connection");
const PaymentFrequency = require("./../../../utils/db/payment_frequency_model");
const Loan = require("./../../db/loan_model");

const createLoanRepository = async ({
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
}) => {
    try {
        const result = await sequelize.transaction(async t => {
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
            }, { transaction: t})

            const allAmount = amount * (percentage / 100 + 1)

            await createQuotas({
                id_payment_frequency,
                id_loan: loan.id,
                start_date,
                allAmount,
                amount,
                t,
            })
            return loan
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

const createQuotas = async ({
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
        await Quota.create({
            name: `${(i + 1)}/${monthly_installments}`,
            description: '',
            id_loan,
            ganancy: (allAmount - amount) / monthly_installments,
            amount: allAmount / monthly_installments,
            date_to_pay: addDays(start_date, days_installment * (i + 1)),
            id_state_quota: 1,
        }, {transaction: t})
    }
}

module.exports = createLoanRepository