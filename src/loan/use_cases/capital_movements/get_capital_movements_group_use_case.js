const getCapitalMovementsGroupRepository = require("../../repositories/capital_movements/get_capital_movements_group_repository")

const getCapitalMovementsGroupUseCase = () => getCapitalMovementsGroupRepository()

module.exports = getCapitalMovementsGroupUseCase