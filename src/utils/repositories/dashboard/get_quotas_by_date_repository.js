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
            'id_state_quota',
            'date_to_pay',
            'paid_date',
        ],
    })
}

module.exports = getQuotasByDateRepository