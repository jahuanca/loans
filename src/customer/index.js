const customerRoutes = require("./routes/customer_routes")
const typeCustomerRoutes = require("./routes/type_customer_route")
const customerPaymentAccountRoutes = require("./routes/customer_payment_account_routes")

const setModuleCustomer = (server)=> {
    server.use('/customer', customerRoutes)
    server.use('/type-customer', typeCustomerRoutes)
    server.use('/customer-payment-account', customerPaymentAccountRoutes)
}   

module.exports = setModuleCustomer