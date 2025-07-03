const { getSummaryOfCalendarRepository } = require("../../repositories/dashboard");

const getSummaryOfCalendarUseCaseExecute = () => getSummaryOfCalendarRepository()

module.exports = getSummaryOfCalendarUseCaseExecute