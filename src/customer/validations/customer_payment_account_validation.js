const Joi = require("joi")
const { joiString, joiId, joiPhone } = require("../../utils/validations/joi_values")
const validateSquema = require("../../utils/validations/validation")

// Mismos formatos que customer_payment_account_model.js.
// Que identificador exige cada categoria (BANK / WALLET) se valida en el use case.
const _squemaCustomerPaymentAccount = {
    idPaymentProvider: joiId.required(),
    accountNumber: Joi.string().trim().pattern(/^\d{10,20}$/).allow(null),
    cci: Joi.string().trim().pattern(/^\d{20}$/).allow(null),
    phone: joiPhone.pattern(/^9\d{8}$/).allow(null),
    holderName: joiString(150).required(),
    isDefault: Joi.boolean().default(false),
    observation: joiString(200).allow(null, ''),
}

const squemaCreate = Joi.object({
    ..._squemaCustomerPaymentAccount,
    idCustomer: joiId.required(),
})

// idCustomer no se acepta en update: la cuenta no cambia de cliente.
const squemaUpdate = Joi.object({
    ..._squemaCustomerPaymentAccount,
    id: joiId.required(),
})

const createCustomerPaymentAccountValidation = (req, res, next) => validateSquema(req, res, next, squemaCreate)
const updateCustomerPaymentAccountValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdate)

module.exports = {
    createCustomerPaymentAccountValidation,
    updateCustomerPaymentAccountValidation,
}
