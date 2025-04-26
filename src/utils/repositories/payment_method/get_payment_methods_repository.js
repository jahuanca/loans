const PaymentMethod = require("../../db/payment_method_model");

const getPaymentMethodsRepository = () => PaymentMethod.findAll()

module.exports = getPaymentMethodsRepository