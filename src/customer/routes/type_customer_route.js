
const { Router } = require('express')
const getTypeCustomerController = require('../controllers/type_customer/get_types_customer_controller')

const typeCustomerRoutes = Router()

typeCustomerRoutes.get('/', getTypeCustomerController)

module.exports = typeCustomerRoutes