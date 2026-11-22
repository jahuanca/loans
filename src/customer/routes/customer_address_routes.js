const { Router } = require("express")
const {
    getCustomerAddressesController,
    getCustomerAddressController,
    createCustomerAddressController,
    updateCustomerAddressController,
    deleteCustomerAddressController,
} = require("../controllers/customer_address")
const {
    createCustomerAddressValidation,
    updateCustomerAddressValidation,
} = require("../validations/customer_address_validation")

const customerAddressRoutes = Router()

customerAddressRoutes.get('/customer/:idCustomer', getCustomerAddressesController)
customerAddressRoutes.get('/id/:id', getCustomerAddressController)
customerAddressRoutes.post('/create', createCustomerAddressValidation, createCustomerAddressController)
customerAddressRoutes.put('/update', updateCustomerAddressValidation, updateCustomerAddressController)
customerAddressRoutes.delete('/delete/:id', deleteCustomerAddressController)

module.exports = customerAddressRoutes
