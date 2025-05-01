const { Router } = require("express");
const {
    getPaymentsFrequencyController,
    createPaymentFrequencyController,
    deletePaymentFrequencyController,
    updatePaymentFrequencyController,
} = require("../controllers/payment_frequency");

const paymentFrequencyRoutes = Router()

paymentFrequencyRoutes.get('/payment-frequency', getPaymentsFrequencyController)
paymentFrequencyRoutes.post('/payment-frequency/create', createPaymentFrequencyController)
paymentFrequencyRoutes.put('/payment-frequency/update', updatePaymentFrequencyController)
paymentFrequencyRoutes.delete('/payment-frequency/delete/:id', deletePaymentFrequencyController)

module.exports = paymentFrequencyRoutes