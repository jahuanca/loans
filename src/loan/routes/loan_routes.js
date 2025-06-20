const { Router } = require("express");
const {
    getLoansController,
    validateLoanController,
    createLoanController,
    createSpecialLoanController,
    updateLoanController,
    deleteLoanController,
} = require("../controllers");

const loanRoutes = Router()

loanRoutes.get('/', getLoansController)
loanRoutes.post('/validate', validateLoanController)
loanRoutes.post('/create', createLoanController)
loanRoutes.post('/create-special', createSpecialLoanController)
loanRoutes.put('/update', updateLoanController)
loanRoutes.delete('/delete/:id', deleteLoanController)

module.exports = loanRoutes