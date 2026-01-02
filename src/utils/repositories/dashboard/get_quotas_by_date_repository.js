const { Sequelize, Op } = require("sequelize");
const Customer = require("../../../customer/db/customer_model");
const Loan = require("../../../loan/db/loan_model");
const Quota = require("../../../quota/db/quota_model");

const getQuotasByDateRepository = ({
    id_state_quota,
    from_date,
    until_date,
}) => {

    const where = {}
    if (from_date && until_date) {
        where.date_to_pay = {
            [Op.between]: [
                from_date, until_date
            ]
        }
    } else {
        if (until_date) {
            where.date_to_pay = {
                [Op.lte]: until_date
            }
        }
    }

    if (id_state_quota) {
        where.id_state_quota = id_state_quota
    }

    return Quota.findAll({
        raw: true,
        where: where,
        include: [
            { model: Loan, include: [{ model: Customer, attributes: [] }], attributes: [] }
        ],
        attributes: [
            'id',
            'name',
            'Loan.id_payment_frequency',
            [
                Sequelize.literal(
                    'CASE WHEN id_payment_frequency = 5 THEN true ELSE false END'
                ),
                'is_special'
            ],
            [
                Sequelize.fn('CONCAT',
                    Sequelize.col('Loan.Customer.name'),
                    ' ',
                    Sequelize.col('Loan.Customer.lastName')
                ),
                'customer_name'
            ],
            'Loan.Customer.alias',
            'id_loan',
            'amount',
            'ganancy',
            'id_state_quota',
            'date_to_pay',
            'paid_date',
        ],
        order: [
            ['date_to_pay', 'ASC']
        ]
    })
}

module.exports = getQuotasByDateRepository