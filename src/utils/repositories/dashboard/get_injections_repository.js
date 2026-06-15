const { fn, col } = require("sequelize")
const Renewal = require("../../../loan/db/renewal_model")

const getInjectionsRepository = async () => {
    return await Renewal.findAll({
        attributes: [
            [ fn('SUM', col('variation_in_amount')), 'inversion' ],
            [ fn('DATE_TRUNC', 'month', col('date')), 'periodo' ],
        ],
        group: [
            fn('DATE_TRUNC', 'month', col('date')),
        ],
        order: [
            [ fn('DATE_TRUNC', 'month', col('date')), 'DESC']
        ]
    })
}

module.exports = getInjectionsRepository