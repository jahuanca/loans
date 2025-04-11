const createLoanController = require("./create_loan");
const getLoansController = require("./get_loans");
const updateLoanController = require("./update_loan");
const deleteLoanController = require("./delete_loan");

module.exports = {
    getLoansController,
    createLoanController,
    updateLoanController,
    deleteLoanController,
}