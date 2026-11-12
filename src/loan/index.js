const { checkTokenController } = require("../utils/controllers/app/app_controller")
const capitalMovementsRouter = require("./routes/capital_movements")
const loanRoutes = require("./routes/loan_routes")
const renewalRoutes = require("./routes/renewal_routes")

const setModuleLoan = (server)=> {
    server.use(checkTokenController)
    server.use('/loan', loanRoutes)
    server.use('/renewal', renewalRoutes)
    server.use('/capital-movements', capitalMovementsRouter)
}   

module.exports = setModuleLoan