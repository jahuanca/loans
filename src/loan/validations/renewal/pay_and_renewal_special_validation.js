const Joi = require('joi')

const joiId = Joi.number().integer()

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
    observation: Joi.string().allow(null),
    evidence: Joi.string().allow(null),
    numberOfInstallments: Joi.number().required(),
    daysBetweenInstallments: Joi.number().required(),
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
