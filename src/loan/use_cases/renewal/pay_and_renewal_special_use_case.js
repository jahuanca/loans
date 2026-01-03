const { payAndRenewalSpecialRepository } = require("../../repositories")

const payAndRenewalSpecialUseCaseExecute = ({
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
    number_of_installments,
    days_between_installments,
}) => payAndRenewalSpecialRepository({
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
    
    number_of_installments,
    days_between_installments,
})

module.exports = payAndRenewalSpecialUseCaseExecute