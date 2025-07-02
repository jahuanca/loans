const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")
const { getFormatDate } = require("../../core/formats")

const getSummaryMonthsRepository = async () => {
    const loan = await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('Quota.ganancy')), 'ganancy'],
            [ sequelize.fn('SUM', sequelize.col('Quota.amount')), 'amount'],
            'id_state_quota',
            [ sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM start_date')), 'month'],
            [ sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM start_date')), 'year'],
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