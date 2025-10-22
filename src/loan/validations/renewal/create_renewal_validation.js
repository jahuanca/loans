
const Joi = require('joi')
const joiId = Joi.number().integer()

const squema = Joi.object({
    id_customer: joiId.required(),
    id_new_loan: joiId.required(),
    date: Joi.date().required(),
    id_previous_loan: joiId.optional().allow(null),
    id_type_renewal: Joi.string().required(),
    variation_in_amount: Joi.number().required(),    
    observation: Joi.string().optional().allow(null),
})

const createRenewalValidation = (req, res, next) => {
    const { value, error } = squema.validate(req.body)
    if (error) {
        const { details } = error
        console.log(details)
        return res.status(500).json({ message: 'Error in validation' })
    }
    req.value = value
    next()
}

module.exports = {
    createRenewalValidation,
}
