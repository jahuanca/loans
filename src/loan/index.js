const loanRoutes = require("./routes/loan_routes")

const setModuleLoan = (server)=> {
    server.use('/loan', loanRoutes)
}   

module.exports = setModuleLoan