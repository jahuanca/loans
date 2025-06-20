const { createSpecialLoanRepository } = require("../repositories");

const createSpecialLoanUseCaseExecute = ({
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
})=> createSpecialLoanRepository({
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
})

module.exports = createSpecialLoanUseCaseExecute