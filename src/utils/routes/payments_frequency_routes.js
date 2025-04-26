const { Router } = require("express");
const {
    getPaymentsFrequencyController,
    createPaymentFrequencyController,
} = require("../controllers/payment_frequency");

const paymentFrequencyRoutes = Router()

paymentFrequencyRoutes.get('/payment-frequency', getPaymentsFrequencyController)
paymentFrequencyRoutes.post('/payment-frequency/create', createPaymentFrequencyController)

module.exports = paymentFrequencyRoutes