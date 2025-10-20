const { payAndRenewalRepository } = require("../../repositories")

const payAndRenewalUseCaseExecute = ({
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
}) => payAndRenewalRepository({
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
})

module.exports = payAndRenewalUseCaseExecute