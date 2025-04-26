const PaymentFrequency = require("../../db/payment_frequency_model");

const getPaymentsFrequencyRepository = () => PaymentFrequency.findAll()

module.exports = getPaymentsFrequencyRepository