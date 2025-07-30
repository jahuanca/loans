
const express = require('express')
const summaryRoutes = express.Router()
const { 
    getSummaryOfDashboardController, 
    getSummaryOfCalendarController,
    getSummaryMonthsController,
    getQuotasByDateController,
} = require('../controllers/dashboard')


summaryRoutes.get('/summary-of-dashboard', getSummaryOfDashboardController)
summaryRoutes.get('/summary-of-calendar', getSummaryOfCalendarController)
summaryRoutes.get('/quotasOfDate', getQuotasByDateController)
summaryRoutes.get('/summary-months', getSummaryMonthsController)

module.exports = summaryRoutes