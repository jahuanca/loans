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
const { actionUser } = require("../../utils/core/action_user_middleware")
const { defaultActions } = require("../../utils/core/default_values")

const customerRoutes = Router()

customerRoutes.get('/', actionUser(defaultActions.CUSTOMER_GET_ALL), getCustomersController)
customerRoutes.get('/all-analytics', getAllCustomersAnalyticsController)
customerRoutes.get('/analytics', getCustomerAnalyticsController)
customerRoutes.post('/create', createCustomerValidation, createCustomerController)
customerRoutes.put('/update', updateCustomerValidation, updateCustomerController)
customerRoutes.delete('/delete/:id', deleteCustomerController)

module.exports = customerRoutes