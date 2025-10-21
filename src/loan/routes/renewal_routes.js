const { Router } = require('express')
const { getRenewalsController, payAndRenewalController, createRenewalController } = require('../controllers')
const { payAndRenewalValidation } = require('../validations/renewal/pay_and_renewal_validation')
const getMetadataRenewalController = require('../controllers/renewal/get_metadata_renewal')

const renewalRoutes = Router()

renewalRoutes.get('/', getRenewalsController)
renewalRoutes.get('/metadata', getMetadataRenewalController)
renewalRoutes.post('/create', createRenewalController)
renewalRoutes.post('/pay_and_renewal', payAndRenewalValidation , payAndRenewalController)

module.exports = renewalRoutes