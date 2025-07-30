
const express = require('express')
const activityLogRoutes = express.Router()
const { getActivityLastsController } = require('../controllers/activity_log/')

activityLogRoutes.get('/log', getActivityLastsController)

module.exports = activityLogRoutes