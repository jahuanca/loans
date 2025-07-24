const Quota = require("../../quota/db/quota_model");
const { addDays } = require("../../utils/core/helpers");
const { sequelize } = require("../../utils/db/connection");
const Loan = require("../db/loan_model");

const createSpecialLoanRepository = async ({
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
    number_of_installments,
    days_between_installments,
}) => {
    console.log(
        id_customer,
        id_payment_frequency,
        id_payment_method,
        amount,
        percentage,
        ganancy,
        id_state_loan,
        number_of_installments,
        days_between_installments,
    )
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
            }, { transaction: t })

            const allAmount = amount * (percentage / 100 + 1)

            await createQuotas({
                number_of_installments,
                days_between_installments,
                id_loan: loan.id,
                start_date,
                allAmount,
                amount,
                t,
            })
            return loan
        });
        return result
    } catch (error) {
        console.log(error)
    }
}

const createQuotas = async ({
    number_of_installments,
    days_between_installments,
    id_loan,
    start_date,
    allAmount,
    amount,
    t,
}) => {

    for (let i = 0; i < number_of_installments; i++) {
        const quota = await Quota.create({
            name: `${(i + 1)}/${number_of_installments}`,
            description: '',
            id_loan,
            ganancy: (allAmount - amount) / number_of_installments,
            amount: allAmount / number_of_installments,
            date_to_pay: addDays(start_date, days_between_installments * (i + 1)),
            id_state_quota: 1,
        }, { transaction: t })
    }
}

module.exports = createSpecialLoanRepository