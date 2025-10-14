const validateLoanController = require("./loan/validate_loan");
const createLoanController = require("./loan/create_loan");
const createSpecialLoanController = require("./loan/create_special_loan");
const getLoansController = require("./loan/get_loans");
const updateLoanController = require("./loan/update_loan");
const deleteLoanController = require("./loan/delete_loan");

module.exports = {
    getLoansController,
    validateLoanController,
    createLoanController,
    createSpecialLoanController,
    updateLoanController,
    deleteLoanController,
}