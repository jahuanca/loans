const Joi = require("joi")

const joiId = Joi.number().integer()

const joiString = (maxValue = 100) => Joi
    .string()
    .trim()
    .max(maxValue)

const joiPhone = Joi
    .string()
    .trim()
    .length(9)
    .pattern(/^\d+$/)

const joiLatLong = Joi
    .string()
    .trim()
    .pattern(/^\d+$/)
    
module.exports = {
    joiId,
    joiString,
    joiPhone,
    joiLatLong,
}