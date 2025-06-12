
const express = require('express')
const { 
    getSummaryController, 
    getQuotasByDateController,
} = require('../controllers/dashboard')
const summaryRoutes = express.Router()


summaryRoutes.get('/summary', getSummaryController)
summaryRoutes.get('/quotasOfDate', getQuotasByDateController)

module.exports = summaryRoutes