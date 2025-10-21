const validateLoanRepository = require("./loan/validate_loan_repository");
const createLoanRepository = require("./loan/create_loan_repository");
const createSpecialLoanRepository = require("./loan/create_special_loan_repository");
const deleteLoanRepository = require("./loan/delete_loan_repository");
const getLoansRepository = require("./loan/get_loans_repository");
const updateLoanRepository = require("./loan/update_loan_repository");
const getLoanRepository  = require("./loan/get_loan_repository");
const getRenewalsRepository = require("./renewal/get_renewals_repository");
const payAndRenewalRepository = require("./renewal/pay_and_renewal_repository");
const createRenewalRepository = require("./renewal/create_renewal_repository");

module.exports = {
    //  Loan
    getLoanRepository,
    getLoansRepository,
    validateLoanRepository,
    createLoanRepository,
    createSpecialLoanRepository,
    updateLoanRepository,
    deleteLoanRepository,
    
    //  Renewal
    getRenewalsRepository,
    createRenewalRepository,
    payAndRenewalRepository,
}