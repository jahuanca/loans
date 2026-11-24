const Joi = require("joi")
const { joiString, joiId, joiLatitude, joiLongitude } = require("../../utils/validations/joi_values")
const validateSquema = require("../../utils/validations/validation")
const { customerAddressTypes } = require("../../utils/core/default_values")

// Mismos formatos que customer_address_model.js.
const _squemaCustomerAddress = {
    type: Joi.string().valid(...Object.values(customerAddressTypes)).required(),
    address: joiString(150).required(),
    reference: joiString(200).allow(null, ''),
    latitude: joiLatitude.allow(null),
    longitude: joiLongitude.allow(null),
    // Clave o URL del archivo ya subido al storage. Obligatoria: toda direccion lleva foto.
    image: joiString(500).required(),
    isPrimary: Joi.boolean().default(false),
}

// Latitud y longitud van juntas: las dos con valor o ninguna (null o ausentes).
const bothCoordinatesOrNone = (value, helpers) => {
    const hasLatitude = value.latitude != null
    const hasLongitude = value.longitude != null
    if (hasLatitude !== hasLongitude) {
        return helpers.message('Latitud y longitud deben enviarse juntas')
    }
    return value
}

const squemaCreate = Joi.object({
    ..._squemaCustomerAddress,
    latitude: joiLatitude.required(),
    longitude: joiLongitude.required(),
    idCustomer: joiId.required(),
}).custom(bothCoordinatesOrNone)

// idCustomer no se acepta en update: la direccion no cambia de cliente.
const squemaUpdate = Joi.object({
    ..._squemaCustomerAddress,
    id: joiId.required(),
}).custom(bothCoordinatesOrNone)

const createCustomerAddressValidation = (req, res, next) => validateSquema(req, res, next, squemaCreate)
const updateCustomerAddressValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdate)

module.exports = {
    createCustomerAddressValidation,
    updateCustomerAddressValidation,
}
