const { Router } = require("express");
const {
    getCustomersController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
} = require("../controllers");

const customerRoutes = Router()

customerRoutes.get('/', getCustomersController)
customerRoutes.post('/create', createCustomerController)
customerRoutes.put('/update', updateCustomerController)
customerRoutes.delete('/delete', deleteCustomerController)

module.exports = customerRoutes