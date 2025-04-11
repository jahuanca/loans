const { Router } = require("express");
const {
    getPaymentMethodsController,
} = require("../controllers");

const paymentMethodRoutes = Router()

paymentMethodRoutes.get('/payment-method', getPaymentMethodsController)

module.exports = paymentMethodRoutes