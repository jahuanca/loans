const express = require('express')

const { startConnection } = require('./utils/db/connection')
const setMiddleware = require('./utils/core/middlewares')
const setModuleUser = require('./user')
const setModuleCustomer = require('./customer')
const setModuleLoan = require('./loan')
const setModuleQuota = require('./quota')
const setModuleUtils = require('./utils')
const setModuleAuth = require('./auth')
const setModuleVideo = require('./video')
const setModuleChat = require('./chat')
const setModuleError = require('./utils/error')

const app = express()

startConnection()
setMiddleware(app)
setModuleAuth(app)
setModuleUser(app)
setModuleCustomer(app)
setModuleLoan(app)
setModuleQuota(app)
setModuleVideo(app)
setModuleChat(app)
setModuleUtils(app)
setModuleError(app)

module.exports = app