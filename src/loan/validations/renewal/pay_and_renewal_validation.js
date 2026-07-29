const Joi = require('joi')
const validateSquema = require('../../../utils/validations/validation')
const { joiId, joiString } = require('../../../utils/validations/joi_values')

const squema = Joi.object({
    id_loan_to_renew: joiId.required(),
    id_of_quota: joiId.required(),
    id_customer: joiId.required(),
    id_payment_frequency: joiId.required(),
    id_payment_method: joiId.required(),
    amount: Joi.number().required(),
    percentage: Joi.number().required(),
    start_date: Joi.date().required(),
    paid_date: Joi.date().required(),
    ganancy: Joi.number().required(),
    observation: joiString(100).allow(null),
    evidence: joiString(100).allow(null),
})

const payAndRenewalValidation = (req, res, next) => validateSquema(req, res, next, squema)

module.exports = {
    payAndRenewalValidation,
}
