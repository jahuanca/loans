const getCustomerPaymentAccountsController = require("./get_customer_payment_accounts")
const getCustomerPaymentAccountController = require("./get_customer_payment_account")
const createCustomerPaymentAccountController = require("./create_customer_payment_account")
const updateCustomerPaymentAccountController = require("./update_customer_payment_account")
const deleteCustomerPaymentAccountController = require("./delete_customer_payment_account")

module.exports = {
    getCustomerPaymentAccountsController,
    getCustomerPaymentAccountController,
    createCustomerPaymentAccountController,
    updateCustomerPaymentAccountController,
    deleteCustomerPaymentAccountController,
}
