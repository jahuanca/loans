const { getSummaryRepository } = require("../repositories");

const getSummaryUseCaseExecute = () => getSummaryRepository()

module.exports = getSummaryUseCaseExecute