const { getPaymentMethodsRepository } = require("../../repositories/payment_method");

const getPaymentMethodsUseCaseExecute = ()=> getPaymentMethodsRepository()

module.exports = getPaymentMethodsUseCaseExecute