const { getPaymentsFrequencyRepository } = require("../../repositories/payment_frequency");

const getPaymentsFrequencyUseCaseExecute = ()=> getPaymentsFrequencyRepository()

module.exports = getPaymentsFrequencyUseCaseExecute