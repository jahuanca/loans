const PaymentFrequency = require("../../db/payment_frequency_model");

const getPaymentsFrequencyRepository = () => PaymentFrequency.findAll({
    order: [['monthly_installments', 'DESC']]
})

module.exports = getPaymentsFrequencyRepository