const { getCustomersWithoutLoanRepository } = require("../../repositories/dashboard")

const getCustomersWithouLoanUseCase = () => getCustomersWithoutLoanRepository()

module.exports = getCustomersWithouLoanUseCase