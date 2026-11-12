const getCapitalMovementsController = require('../controllers/capital_movements/get_capital_movements')
const getCapitalMovementsGroupController = require('../controllers/capital_movements/get_capital_movements_group')

const capitalMovementsRouter = require('express').Router()

capitalMovementsRouter.get('/', getCapitalMovementsController)
capitalMovementsRouter.get('/group', getCapitalMovementsGroupController)

module.exports = capitalMovementsRouter