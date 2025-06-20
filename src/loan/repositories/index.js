const validateLoanRepository = require("./validate_loan_repository");
const createLoanRepository = require("./create_loan_repository");
const createSpecialLoanRepository = require("./create_special_loan_repository");
const deleteLoanRepository = require("./delete_loan_repository");
const getLoansRepository = require("./get_loans_repository");
const updateLoanRepository = require("./update_loan_repository");

module.exports = {
    getLoansRepository,
    validateLoanRepository,
    createLoanRepository,
    createSpecialLoanRepository,
    updateLoanRepository,
    deleteLoanRepository,
}