const { Router } = require("express");
const {
    getCustomersController,
    getCustomerAnalyticsController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
} = require("../controllers");

const customerRoutes = Router()

customerRoutes.get('/', getCustomersController)
customerRoutes.get('/analytics', getCustomerAnalyticsController)
customerRoutes.post('/create', createCustomerController)
customerRoutes.put('/update', updateCustomerController)
customerRoutes.delete('/delete/:id', deleteCustomerController)

module.exports = customerRoutes