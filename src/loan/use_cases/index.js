const createLoanUseCaseExecute = require("./loan/create_loan_use_case");
const createSpecialLoanUseCaseExecute = require("./loan/create_special_loan_use_case");
const deleteLoanUseCaseExecute = require("./loan/delete_loan_use_case");
const getLoansUseCaseExecute = require("./loan/get_loans_use_case");
const updateLoanUseCaseExecute = require("./loan/update_loan_use_case");
const validateLoanUseCaseExecute = require("./loan/validate_loan_use_case");


module.exports = {
    createLoanUseCaseExecute,
    createSpecialLoanUseCaseExecute,
    deleteLoanUseCaseExecute,
    getLoansUseCaseExecute,
    updateLoanUseCaseExecute,
    validateLoanUseCaseExecute,
}