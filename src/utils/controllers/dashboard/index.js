const getSummaryOfDashboardController = require('./get_summary_of_dashboard')
const getSummaryOfCalendarController = require('./get_summary_of_calendar')
const getQuotasByDateController = require('./get_quotas_by_date')
const getSummaryMonthsController = require('./get_summary_months')
const getNextRenewalController = require('./get_next_renewal')
const getInjectionsController = require('./get_injections')
const getCustomersWithoutLoanController = require('./get_customers_without_loan')

module.exports = {
    getSummaryOfDashboardController,
    getSummaryOfCalendarController,
    getQuotasByDateController,
    getSummaryMonthsController,
    getNextRenewalController,
    getInjectionsController,
    getCustomersWithoutLoanController,
}