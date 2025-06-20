const validateLoanController = require("./validate_loan");
const createLoanController = require("./create_loan");
const createSpecialLoanController = require("./create_special_loan");
const getLoansController = require("./get_loans");
const updateLoanController = require("./update_loan");
const deleteLoanController = require("./delete_loan");

module.exports = {
    getLoansController,
    validateLoanController,
    createLoanController,
    createSpecialLoanController,
    updateLoanController,
    deleteLoanController,
}