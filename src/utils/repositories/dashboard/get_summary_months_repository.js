const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")

const getSummaryMonthsRepository = async () => {
    const loan = await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('Quota.ganancy')), 'ganancy'],
            [ sequelize.fn('SUM', sequelize.col('Quota.amount')), 'amount'],
            'id_state_quota',
            [ sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_to_pay')), 'month'],
            [ sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_to_pay')), 'year'],
        ],
        group: ['month', 'year', 'id_state_quota'],
        order: [['year', 'DESC'], ['month', 'DESC']],
        include: [
            {model: Loan, required: true, attributes: []}
        ],
        raw: true,
    })

    return loan
}

module.exports = getSummaryMonthsRepository