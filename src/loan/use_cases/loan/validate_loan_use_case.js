const { validateLoanRepository } = require("./../../repositories");

const validateLoanUseCaseExecute = ({
    idCustomer,
    idPaymentFrequency,
    amount,
    percentage,
    startDate,
}) => validateLoanRepository({
    idCustomer,
    idPaymentFrequency,
    amount,
    percentage,
    startDate,
})

module.exports = validateLoanUseCaseExecute