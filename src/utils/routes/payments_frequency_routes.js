const { Router } = require("express");
const {
    getPaymentsFrequencyController,
} = require("../controllers");

const paymentFrequencyRoutes = Router()

paymentFrequencyRoutes.get('/payment-frequency', getPaymentsFrequencyController)

module.exports = paymentFrequencyRoutes