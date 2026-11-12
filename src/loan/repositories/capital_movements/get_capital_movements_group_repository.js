const { models } = require("../../../utils/db")
const { sequelize } = require("../../../utils/db/connection")
const { CapitalMovements } = models

const getCapitalMovementsGroupRepository = () => {
    return CapitalMovements.findAll({
        attributes: [
            'type',
            [sequelize.fn('SUM', sequelize.col('amount')), 'amount'],
            [sequelize.fn('SUM', sequelize.col('ganancy')), 'ganancy']
        ],
        group: ['type'],
    })
}

module.exports = getCapitalMovementsGroupRepository