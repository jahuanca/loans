
const Joi = require('joi')
const joiId = Joi.number().integer()

const squema = Joi.object({
    idCustomer: joiId.required(),
    idNewLoan: joiId.required(),
    date: Joi.date().required(),
    idPreviousLoan: joiId.allow(null),
    idTypeRenewal: Joi.string().required(),
    variationInAmount: Joi.number().required(),    
    observation: Joi.string().allow(null),
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
