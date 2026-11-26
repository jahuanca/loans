const { getPaymentProvidersRepository } = require("../../repositories/payment_provider")

const getPaymentProvidersUseCaseExecute = () => getPaymentProvidersRepository()

module.exports = getPaymentProvidersUseCaseExecute
