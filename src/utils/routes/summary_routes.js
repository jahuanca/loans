
const express = require('express')
const { 
    getSummaryOfDashboardController, 
    getSummaryOfCalendarController,
    getSummaryMonthsController,
    getQuotasByDateController,
} = require('../controllers/dashboard')
const summaryRoutes = express.Router()


summaryRoutes.get('/summary-of-dashboard', getSummaryOfDashboardController)
summaryRoutes.get('/summary-of-calendar', getSummaryOfCalendarController)
summaryRoutes.get('/quotasOfDate', getQuotasByDateController)
summaryRoutes.get('/summary-months', getSummaryMonthsController)

module.exports = summaryRoutes