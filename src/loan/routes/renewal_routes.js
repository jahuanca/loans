const { Router } = require('express')
const { getRenewalsController, payAndRenewalController } = require('../controllers')
const { payAndRenewalValidation } = require('../validations/renewal/pay_and_renewal_validation')

const renewalRoutes = Router()

renewalRoutes.get('/', getRenewalsController)
renewalRoutes.post('/pay_and_renewal', payAndRenewalValidation , payAndRenewalController)

module.exports = renewalRoutes