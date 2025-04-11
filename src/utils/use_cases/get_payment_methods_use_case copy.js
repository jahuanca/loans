const { getPaymentMethodsRepository } = require("../repositories");

const getPaymentMethodsUseCaseExecute = ()=> getPaymentMethodsRepository()

module.exports = getPaymentMethodsUseCaseExecute