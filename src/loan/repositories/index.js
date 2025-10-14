const validateLoanRepository = require("./loan/validate_loan_repository");
const createLoanRepository = require("./loan/create_loan_repository");
const createSpecialLoanRepository = require("./loan/create_special_loan_repository");
const deleteLoanRepository = require("./loan/delete_loan_repository");
const getLoansRepository = require("./loan/get_loans_repository");
const updateLoanRepository = require("./loan/update_loan_repository");

module.exports = {
    getLoansRepository,
    validateLoanRepository,
    createLoanRepository,
    createSpecialLoanRepository,
    updateLoanRepository,
    deleteLoanRepository,
}