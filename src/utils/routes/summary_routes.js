
const express = require('express')
const { getSummaryController } = require('../controllers')
const summaryRoutes = express.Router()


summaryRoutes.get('/summary', getSummaryController)

module.exports = summaryRoutes