const Joi = require("joi")
const { joiString, joiId, joiPhone, joiLatLong } = require("../../utils/validations/joi_values")
const validateSquema = require("../../utils/validations/validation")

const _squemaCustomer = {
    id_type_customer: joiId.required(),
    id_type_document: joiId.required(),
    alias: joiString(50).allow(null),
    name: joiString(100).required(),
    lastName: joiString(100).required(),
    address: joiString(100).required(),
    phone: joiPhone.allow(null),
    latitude: joiLatLong.allow(null),
    longitude: joiLatLong.allow(null),
    document: joiString(200).required(),
}

const squemaCreate = Joi.object(_squemaCustomer)

const squemaUpdate = Joi.object({
    ..._squemaCustomer,
    id: joiId.required(),
})

const createCustomerValidation = (req, res, next) => validateSquema(req, res, next, squemaCreate)
const updateCustomerValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdate)

module.exports = {
    createCustomerValidation,
    updateCustomerValidation,
}