const { typeRenewal } = require("../../../utils/core/default_values")
const { sequelize } = require("../../../utils/db/connection")
const Loan = require("../../db/loan_model")
const Renewal = require("../../db/renewal_model")
const { payQuota, createLoan } = require("../utils")

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

        const { dataValues } = loan

        const loanToRenew = await Loan.findByPk(id_loan_to_renew)
        const { id: idLast, amount: amountLast, } = loanToRenew.dataValues

        const variation_in_amount = amount - amountLast

        let id_type_renewal = typeRenewal.SAME_AMOUNT
        if (variation_in_amount > 0) { id_type_renewal = typeRenewal.INCREASE }
        if (variation_in_amount < 0) { id_type_renewal = typeRenewal.DECREASE }

        const renewal = await Renewal.create({
            id_customer,
            id_user: idUser,
            id_previous_loan: idLast,
            id_new_loan: dataValues.id,
            variation_in_amount: variation_in_amount,
            id_type_renewal: id_type_renewal,
        }, {transaction: t})

        return {
            quota: quotaPaid,
            loan: loan,
        }
    })
    return valueToReturn
}

module.exports = payAndRenewalRepository