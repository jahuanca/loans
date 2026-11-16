const Joi = require('joi')
const validateSquema = require('../../../utils/validations/validation')
const { joiId, joiString } = require('../../../utils/validations/joi_values')

const squema = Joi.object({
    idLoanToRenew: joiId.required(),
    idOfQuota: joiId.required(),
    idCustomer: joiId.required(),
    idPaymentFrequency: joiId.required(),
    idPaymentMethod: joiId.required(),
    amount: Joi.number().required(),
    percentage: Joi.number().required(),
    startDate: Joi.date().required(),
    paidDate: Joi.date().required(),
    ganancy: Joi.number().required(),
    observation: joiString(100).allow(null),
    evidence: joiString(100).allow(null),
})

const payAndRenewalValidation = (req, res, next) => validateSquema(req, res, next, squema)

module.exports = {
    payAndRenewalValidation,
}
