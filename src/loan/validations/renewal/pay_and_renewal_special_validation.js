const Joi = require('joi')

const joiId = Joi.number().integer()

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
    observation: Joi.string().optional(),
    evidence: Joi.string().optional(),
    number_of_installments: Joi.number().required(),
    days_between_installments: Joi.number().required(),
})

const payAndRenewalSpecialValidation = (req, res, next) => {
    const { value, error } = squema.validate(req.body)
    if (error) {
        const { details } = error
        console.log(details)
        return res.status(500).json({message: 'Error in validation'})
    }
    req.value = value
    next()
}

module.exports = {
    payAndRenewalSpecialValidation,
}
