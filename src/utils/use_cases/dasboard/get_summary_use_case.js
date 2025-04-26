const { getSummaryRepository } = require("../../repositories/dashboard");

const getSummaryUseCaseExecute = () => getSummaryRepository()

module.exports = getSummaryUseCaseExecute