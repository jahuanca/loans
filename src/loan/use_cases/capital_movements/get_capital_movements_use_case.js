const getCapitalMovementsRepository = require("../../repositories/capital_movements/get_capital_movements_repository")

const getCapitalMovementsUseCase = () => getCapitalMovementsRepository()

module.exports = getCapitalMovementsUseCase