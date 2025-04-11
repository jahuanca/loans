const { createLoanRepository } = require("../repositories");

const createLoanUseCaseExecute = ({
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
})=> createLoanRepository({
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
})

module.exports = createLoanUseCaseExecute