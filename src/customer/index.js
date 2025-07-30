const { checkTokenController } = require("../utils/controllers/app/app_controller")
const customerRoutes = require("./routes/customer_routes")

const setModuleCustomer = (server)=> {
    server.use(checkTokenController)
    server.use('/customer', customerRoutes)
}   

module.exports = setModuleCustomer