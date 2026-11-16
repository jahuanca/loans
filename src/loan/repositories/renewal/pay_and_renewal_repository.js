const { typeRenewal } = require("../../../utils/core/default_values")
const { sequelize } = require("../../../utils/db/connection")
const Loan = require("../../db/loan_model")
const Renewal = require("../../db/renewal_model")
const { payQuota, createLoan, createRenewal } = require("../utils")

const payAndRenewalRepository = async ({
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

}) => {
    const valueToReturn = await sequelize.transaction(async t => {
        const quotaPaid = await payQuota({
            idOfQuota,
            paidDate,
            idUser,
            t,
        })

        const loan = await createLoan({
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
            t,
        })

        await createRenewal({
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

module.exports = payAndRenewalRepository