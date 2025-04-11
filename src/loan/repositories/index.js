const createLoanRepository = require("./create_loan_repository");
const deleteLoanRepository = require("./delete_loan_repository");
const getLoansRepository = require("./get_loans_repository");
const updateLoanRepository = require("./update_loan_repository");

module.exports = {
    getLoansRepository,
    createLoanRepository,
    updateLoanRepository,
    deleteLoanRepository,
}