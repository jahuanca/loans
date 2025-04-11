const express = require('express')
const { startConnection } = require('./utils/db/connection')
const setMiddleware = require('./utils/core/middlewares')
const setModuleUser = require('./user')
const setModuleCustomer = require('./customer')
const setModuleLoan = require('./loan')
const setModuleQuota = require('./quota')
const setModuleTypeCustomer = require('./utils')
const setModuleUtils = require('./utils')
const setModuleAuth = require('./auth')


const app = express()

startConnection()
setMiddleware(app)
setModuleAuth(app)
setModuleUser(app)
setModuleCustomer(app)
setModuleLoan(app)
setModuleQuota(app)
setModuleUtils(app)

module.exports = app