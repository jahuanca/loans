const { getSummaryMonthsRepository } = require("../../repositories/dashboard");

const getSummaryMonthsUseCaseExecute = () => getSummaryMonthsRepository()

module.exports = getSummaryMonthsUseCaseExecute