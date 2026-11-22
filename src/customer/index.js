const customerRoutes = require("./routes/customer_routes")
const typeCustomerRoutes = require("./routes/type_customer_route")
const customerPaymentAccountRoutes = require("./routes/customer_payment_account_routes")
const customerAddressRoutes = require("./routes/customer_address_routes")

const setModuleCustomer = (server)=> {
    server.use('/customer', customerRoutes)
    server.use('/type-customer', typeCustomerRoutes)
    server.use('/customer-payment-account', customerPaymentAccountRoutes)
    server.use('/customer-address', customerAddressRoutes)
}   

module.exports = setModuleCustomer