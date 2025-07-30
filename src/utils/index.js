const typeCustomerRoutes = require("./routes/type_customer_routes")
const paymentFrequencyRoutes = require("./routes/payments_frequency_routes")
const paymentsMethodRoutes = require("./routes/payment_methods_routes")
const summaryRoutes = require("./routes/summary_routes")
const { checkTokenController } = require("./controllers/app/app_controller")
const activityLogRoutes = require("./routes/activity_log_routes")

const setModuleUtils = (server)=> {
    server.use(checkTokenController)
    server.use('/utils' , typeCustomerRoutes)
    server.use('/utils', paymentFrequencyRoutes)
    server.use('/utils', paymentsMethodRoutes)
    server.use('/utils', summaryRoutes)
    server.use('/utils', activityLogRoutes)
}   

module.exports = setModuleUtils