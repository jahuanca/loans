const { Router } = require('express')
const { 
    getRenewalsController, 
    payAndRenewalController, 
    createRenewalController,
    payAndRenewalSpecialController,
} = require('../controllers')
const { payAndRenewalValidation } = require('../validations/renewal/pay_and_renewal_validation')
const getMetadataRenewalController = require('../controllers/renewal/get_metadata_renewal')
const { createRenewalValidation } = require('../validations/renewal/create_renewal_validation')
const { payAndRenewalSpecialValidation } = require('../validations/renewal/pay_and_renewal_special_validation')

const renewalRoutes = Router()

renewalRoutes.get('/', getRenewalsController)
renewalRoutes.get('/metadata', getMetadataRenewalController)
renewalRoutes.post('/create', createRenewalValidation, createRenewalController)
renewalRoutes.post('/pay_and_renewal', payAndRenewalValidation , payAndRenewalController)
renewalRoutes.post('/pay_and_renewal_special', payAndRenewalSpecialValidation , payAndRenewalSpecialController)

module.exports = renewalRoutes