const { Router } = require("express")
const {
    getCustomersController,
    getCustomerAnalyticsController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
    getAllCustomersAnalyticsController,
} = require("../controllers")
const { createCustomerValidation, updateCustomerValidation } = require("../validations/customer_validation")

const customerRoutes = Router()

customerRoutes.get('/', getCustomersController)
customerRoutes.get('/all-analytics', getAllCustomersAnalyticsController)
customerRoutes.get('/analytics', getCustomerAnalyticsController)
customerRoutes.post('/create', createCustomerValidation, createCustomerController)
customerRoutes.put('/update', updateCustomerValidation, updateCustomerController)
customerRoutes.delete('/delete/:id', deleteCustomerController)

module.exports = customerRoutes