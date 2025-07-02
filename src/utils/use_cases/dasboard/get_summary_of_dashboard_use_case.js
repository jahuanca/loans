const { getSummaryOfDashboardRepository } = require("../../repositories/dashboard");

const getSummaryOfDashboardUseCaseExecute = () => getSummaryOfDashboardRepository()

module.exports = getSummaryOfDashboardUseCaseExecute