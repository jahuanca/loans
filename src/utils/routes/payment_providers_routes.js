const { Router } = require("express");
const { getPaymentProvidersController } = require("../controllers/payment_provider");

const paymentProviderRoutes = Router()

// Catalogo de solo lectura: los proveedores se cargan con el seeder
// 20261122000001-seed-payment-providers.
paymentProviderRoutes.get('/payment-provider', getPaymentProvidersController)

module.exports = paymentProviderRoutes
