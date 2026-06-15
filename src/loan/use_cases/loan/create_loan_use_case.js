const { createLoanRepository } = require("./../../repositories/index");

const createLoanUseCaseExecute = ({
    id_customer,
    id_loan_to_renew,
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
})=> createLoanRepository({
    id_customer,
    id_loan_to_renew,
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
})

module.exports = createLoanUseCaseExecute