const { getNextRenewalRepository } = require("../../repositories/dashboard");

const getNextRenewalUseCaseExecute = () => getNextRenewalRepository()

module.exports = getNextRenewalUseCaseExecute