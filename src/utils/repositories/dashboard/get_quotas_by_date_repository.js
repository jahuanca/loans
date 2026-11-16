const { Sequelize, Op } = require("sequelize");
const Quota = require("../../../quota/db/quota_model");
const { models } = require("../../db/index");

const getQuotasByDateRepository = ({
    idStateQuota,
    fromDate,
    untilDate,
}) => {

    const where = {}
    if (fromDate && untilDate) {
        where.dateToPay = {
            [Op.between]: [
                fromDate, untilDate
            ]
        }
    } else {
        if (untilDate) {
            where.dateToPay = {
                [Op.lte]: untilDate
            }
        }
    }

    if (idStateQuota) {
        where.idStateQuota = idStateQuota
    }

    return Quota.findAll({
        raw: true,
        nest: true,
        where: where,
        include: [
            { model: models.Loan, include: [{ model: models.Customer, attributes: [] }], attributes: [] }
        ],
        attributes: [
            'id',
            'name',
            'isLast',
            [Sequelize.col('Loan.id_payment_frequency'), 'idPaymentFrequency'],
            [
                Sequelize.literal(
                    'CASE WHEN id_payment_frequency = 5 THEN true ELSE false END'
                ),
                'isSpecial'
            ],
            [
                Sequelize.fn('CONCAT',
                    Sequelize.col('Loan.Customer.name'),
                    ' ',
                    Sequelize.col('Loan.Customer.last_name')
                ),
                'customerName'
            ],
            'Loan.Customer.alias',
            'idLoan',
            'amount',
            'ganancy',
            'idStateQuota',
            'dateToPay',
            'paidDate',
        ],
        order: [
            ['dateToPay', 'ASC']
        ]
    })
}

module.exports = getQuotasByDateRepository