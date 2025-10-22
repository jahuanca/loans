const PaymentFrequency = require("../../db/payment_frequency_model");

const getPaymentsFrequencyRepository = () => PaymentFrequency.findAll({
    order: [['id', 'ASC']]
})

module.exports = getPaymentsFrequencyRepository