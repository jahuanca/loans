const { typeRenewal } = require("../../../utils/core/default_values")
const { sequelize } = require("../../../utils/db/connection")
const Loan = require("../../db/loan_model")
const Renewal = require("../../db/renewal_model")
const { payQuota, createLoan, createRenewal } = require("../utils")

const payAndRenewalRepository = async ({
    id_loan_to_renew,

    id_of_quota,
    paid_date,
    idUser,

    id_customer,
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
    const valueToReturn = await sequelize.transaction(async t => {
        const quotaPaid = await payQuota({
            id_of_quota,
            paid_date,
            idUser,
            t,
        })

        const loan = await createLoan({
            id_customer,
            id_user: idUser,
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
        })

        await createRenewal({
            loan,
            id_loan_to_renew,
            amount,
            id_customer,
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

module.exports = payAndRenewalRepository