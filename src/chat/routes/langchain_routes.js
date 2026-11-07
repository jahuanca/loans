const { Router } = require('express')
const { askLangchainController } = require('../controllers')
const langchainRoutes = Router()

langchainRoutes.post('/', askLangchainController)

module.exports = langchainRoutes