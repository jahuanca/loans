const { Router } = require("express");
const {
    getPaymentMethodsController,
} = require("../controllers/payment_method");

const paymentMethodRoutes = Router()

paymentMethodRoutes.get('/payment-method', getPaymentMethodsController)

module.exports = paymentMethodRoutes