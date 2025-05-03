const createPaymentMethodRepository = require("./create_payment_method_repository");
const getPaymentMethodsRepository = require("./get_payment_methods_repository");
const updatePaymentMethodRepository = require("./update_payment_method_repository");

module.exports = {
    getPaymentMethodsRepository,
    createPaymentMethodRepository,
    updatePaymentMethodRepository,
}