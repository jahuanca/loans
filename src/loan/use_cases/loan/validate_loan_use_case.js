const { validateLoanRepository } = require("./../../repositories");

const validateLoanUseCaseExecute = ({
    id_customer,
    id_payment_frequency,
    amount,
    percentage,
    start_date,
}) => validateLoanRepository({
    id_customer,
    id_payment_frequency,
    amount,
    percentage,
    start_date,
})

module.exports = validateLoanUseCaseExecute