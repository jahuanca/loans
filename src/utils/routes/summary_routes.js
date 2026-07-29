
const express = require('express')
const summaryRoutes = express.Router()
const { 
    getSummaryOfDashboardController, 
    getSummaryOfCalendarController,
    getSummaryMonthsController,
    getQuotasByDateController,
    getNextRenewalController,
    getInjectionsController,
    getCustomersWithoutLoanController,
} = require('../controllers/dashboard')


summaryRoutes.get('/summary-of-dashboard', getSummaryOfDashboardController)
summaryRoutes.get('/summary-of-calendar', getSummaryOfCalendarController)
summaryRoutes.get('/quotasOfDate', getQuotasByDateController)
summaryRoutes.get('/summary-months', getSummaryMonthsController)
summaryRoutes.get('/injections', getInjectionsController)
summaryRoutes.get('/customers-without-loan', getCustomersWithoutLoanController)
summaryRoutes.get('/next-renewal', getNextRenewalController)
summaryRoutes.get('/customer-without-loan', getCustomersWithoutLoanController)

module.exports = summaryRoutes