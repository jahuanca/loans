const { Router } = require("express");
const {
    getPaymentMethodsController,
    createPaymentMethodController,
    updatePaymentMethodController,
    deletePaymentMethodController,
} = require("../controllers/payment_method");

const paymentMethodRoutes = Router()

paymentMethodRoutes.get('/payment-method', getPaymentMethodsController)
paymentMethodRoutes.post('/payment-method/create', createPaymentMethodController)
paymentMethodRoutes.put('/payment-method/update', updatePaymentMethodController)
paymentMethodRoutes.delete('/payment-method/delete/:id', deletePaymentMethodController)

module.exports = paymentMethodRoutes