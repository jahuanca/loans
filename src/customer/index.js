const { checkTokenController } = require("../utils/controllers/app/app_controller")
const customerRoutes = require("./routes/customer_routes")
const typeCustomerRoutes = require("./routes/type_customer_route")

const setModuleCustomer = (server)=> {
    server.use(checkTokenController)
    server.use('/customer', customerRoutes)
    server.use('/type-customer', typeCustomerRoutes)
}   

module.exports = setModuleCustomer