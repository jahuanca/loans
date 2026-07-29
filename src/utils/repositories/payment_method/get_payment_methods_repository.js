const PaymentMethod = require("../../db/models/payment_method_model");

const getPaymentMethodsRepository = () => PaymentMethod.findAll()

module.exports = getPaymentMethodsRepository