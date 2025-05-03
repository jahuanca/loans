const createPaymentMethodController = require('./create_payment_method')
const deletePaymentMethodController = require('./delete_payment_method')
const getPaymentMethodsController  = require('./get_payment_methods')
const updatePaymentMethodController = require('./update_payment_method')

module.exports = {
    getPaymentMethodsController,
    createPaymentMethodController,
    updatePaymentMethodController,
    deletePaymentMethodController,   
}