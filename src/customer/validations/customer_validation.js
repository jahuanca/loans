const Joi = require("joi")
const { joiString, joiId, joiPhone } = require("../../utils/validations/joi_values")
const validateSquema = require("../../utils/validations/validation")

const _squemaCustomer = {
    idTypeCustomer: joiId.required(),
    idAssignedRecoveryAgent: joiId.required(),
    idTypeDocument: joiId.required(),
    alias: joiString(50).allow(null, ''),
    name: joiString(100).required(),
    lastName: joiString(100).required(),
    // Opcional: las direcciones viven en /customer-address y se agregan desde el detalle.
    address: joiString(100).allow(null, ''),
    phone: joiPhone.required(),
    document: joiString(200).required(),
}

const squemaCreate = Joi.object(_squemaCustomer)

const squemaUpdate = Joi.object({
    ..._squemaCustomer,
    id: joiId.required(),
})

// Update por secciones: cada esquema acepta SOLO los campos de su formulario en la app.
// Joi rechaza claves desconocidas, asi una seccion no puede pisar datos de otra.
const pickFields = (...keys) => Object.fromEntries(keys.map((key) => [key, _squemaCustomer[key]]))

// AddCustomerPersonalDataPage
const squemaUpdatePersonalData = Joi.object({
    ...pickFields('idTypeDocument', 'document', 'name', 'lastName', 'phone'),
    alias: joiString(50).allow(null, ''),
    id: joiId.required(),
})

// AddCustomerManageDataPage
const squemaUpdateManageData = Joi.object({
    ...pickFields('idTypeCustomer', 'idAssignedRecoveryAgent'),
    id: joiId.required(),
})

const createCustomerValidation = (req, res, next) => validateSquema(req, res, next, squemaCreate)
const updateCustomerValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdate)

const updateCustomerPersonalDataValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdatePersonalData)
const updateCustomerManageDataValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdateManageData)

module.exports = {
    createCustomerValidation,
    updateCustomerValidation,
    updateCustomerPersonalDataValidation,
    updateCustomerManageDataValidation,
}