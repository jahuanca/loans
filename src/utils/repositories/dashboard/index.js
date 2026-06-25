const getSummaryOfDashboardRepository = require("./get_summary_of_dashboard_repository");
const getSummaryOfCalendarRepository = require("./get_summary_of_calendar_repository");
const getSummaryMonthsRepository = require("./get_summary_months_repository");
const getQuotasByDateRepository = require("./get_quotas_by_date_repository");
const getNextRenewalRepository = require("./get_next_renewal_repository");
const getInjectionsRepository = require("./get_injections_repository");
const getCustomersWithoutLoanRepository = require("./get_customers_without_loan_repository");

module.exports = {
    getSummaryOfDashboardRepository,
    getSummaryOfCalendarRepository,
    getSummaryMonthsRepository,
    getQuotasByDateRepository,
    getNextRenewalRepository,
    getInjectionsRepository,
    getCustomersWithoutLoanRepository,
}