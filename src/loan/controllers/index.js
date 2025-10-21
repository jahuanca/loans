const validateLoanController = require("./loan/validate_loan");
const createLoanController = require("./loan/create_loan");
const createSpecialLoanController = require("./loan/create_special_loan");
const getLoansController = require("./loan/get_loans");
const updateLoanController = require("./loan/update_loan");
const deleteLoanController = require("./loan/delete_loan");
const getRenewalsController = require("./renewal/get_renewals");
const getLoanController = require("./loan/get_loan");
const payAndRenewalController = require("./renewal/pay_and_renewal");
const createRenewalController = require("./renewal/create_renewal_controller");

module.exports = {
    //loan
    getLoanController,
    getLoansController,
    validateLoanController,
    createLoanController,
    createSpecialLoanController,
    updateLoanController,
    deleteLoanController,

    //renewal
    getRenewalsController,
    createRenewalController,
    payAndRenewalController,
}