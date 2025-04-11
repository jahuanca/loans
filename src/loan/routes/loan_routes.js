const { Router } = require("express");
const {
    getLoansController,
    createLoanController,
    updateLoanController,
    deleteLoanController,
} = require("../controllers");

const loanRoutes = Router()

loanRoutes.get('/', getLoansController)
loanRoutes.post('/create', createLoanController)
loanRoutes.put('/update', updateLoanController)
loanRoutes.delete('/delete', deleteLoanController)

module.exports = loanRoutes