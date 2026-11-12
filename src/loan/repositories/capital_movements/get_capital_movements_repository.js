const { models } = require("../../../utils/db")
const { CapitalMovements } = models

const getCapitalMovementsRepository = () => {
    return CapitalMovements.findAll()
}

module.exports = getCapitalMovementsRepository