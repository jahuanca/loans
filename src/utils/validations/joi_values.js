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

// Coordenadas en grados decimales, 6 decimales como DECIMAL(9,6) en la BD.
// Acepta negativos (todo Peru tiene latitud y longitud negativas).
const joiLatitude = Joi
    .number()
    .min(-90)
    .max(90)
    .precision(6)

const joiLongitude = Joi
    .number()
    .min(-180)
    .max(180)
    .precision(6)
    
module.exports = {
    joiId,
    joiString,
    joiPhone,
    joiLatitude,
    joiLongitude,
}