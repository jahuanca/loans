const customerRoutes = require("./routes/customer_routes")

const setModuleCustomer = (server)=> {
    server.use('/customer', customerRoutes)
}   

module.exports = setModuleCustomer