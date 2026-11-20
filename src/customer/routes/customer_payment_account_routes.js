const { Router } = require("express")
const {
    getCustomerPaymentAccountsController,
    getCustomerPaymentAccountController,
    createCustomerPaymentAccountController,
    updateCustomerPaymentAccountController,
    deleteCustomerPaymentAccountController,
} = require("../controllers/customer_payment_account")
const {
    createCustomerPaymentAccountValidation,
    updateCustomerPaymentAccountValidation,
} = require("../validations/customer_payment_account_validation")

const customerPaymentAccountRoutes = Router()

customerPaymentAccountRoutes.get('/customer/:idCustomer', getCustomerPaymentAccountsController)
customerPaymentAccountRoutes.get('/id/:id', getCustomerPaymentAccountController)
customerPaymentAccountRoutes.post('/create', createCustomerPaymentAccountValidation, createCustomerPaymentAccountController)
customerPaymentAccountRoutes.put('/update', updateCustomerPaymentAccountValidation, updateCustomerPaymentAccountController)
customerPaymentAccountRoutes.delete('/delete/:id', deleteCustomerPaymentAccountController)

module.exports = customerPaymentAccountRoutes
