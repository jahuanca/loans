const typeCustomerRoutes = require("./routes/type_customer_routes")
const paymentFrequencyRoutes = require("./routes/payments_frequency_routes")
const paymentsMethodRoutes = require("./routes/payment_methods_routes")

const setModuleUtils = (server)=> {
    server.use('/utils', typeCustomerRoutes)
    server.use('/utils', paymentFrequencyRoutes)
    server.use('/utils', paymentsMethodRoutes)
}   

module.exports = setModuleUtils