const createLoanUseCaseExecute = require("./loan/create_loan_use_case");
const createSpecialLoanUseCaseExecute = require("./loan/create_special_loan_use_case");
const deleteLoanUseCaseExecute = require("./loan/delete_loan_use_case");
const getLoanUseCaseExecute = require("./loan/get_loan_use_case");
const getLoansUseCaseExecute = require("./loan/get_loans_use_case");
const updateLoanUseCaseExecute = require("./loan/update_loan_use_case");
const validateLoanUseCaseExecute = require("./loan/validate_loan_use_case");
const getRenewalsUseCaseExecute = require("./renewal/get_renewals_use_case");


module.exports = {
    // Loan
    createLoanUseCaseExecute,
    createSpecialLoanUseCaseExecute,
    deleteLoanUseCaseExecute,
    getLoansUseCaseExecute,
    getLoanUseCaseExecute,
    updateLoanUseCaseExecute,
    validateLoanUseCaseExecute,

    // Renewal
    getRenewalsUseCaseExecute,
    
}