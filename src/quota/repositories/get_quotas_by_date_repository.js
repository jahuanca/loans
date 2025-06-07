const { Sequelize } = require("sequelize");
const Customer = require("../../customer/db/customer_model");
const Loan = require("../../loan/db/loan_model");
const Quota = require("../db/quota_model");

const getQuotasByDateRepository = (query) => {
    const { date } = query

    return Quota.findAll({
        raw: true,
        where: { date_to_pay: date },
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
            'amount',
            'id_state_quota',
            'date_to_pay',
        ],
    })
}

module.exports = getQuotasByDateRepository