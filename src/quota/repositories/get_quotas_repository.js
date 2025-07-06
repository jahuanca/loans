const { Op } = require("sequelize");
const Quota = require("../db/quota_model");
const Loan = require("../../loan/db/loan_model");

const getQuotasRepository = ({
    id_loan,
    id_state_quota,
    from_date,
    until_date,
}) => {

    let where = {}

    if (id_state_quota) {
        where.id_state_quota = id_state_quota
    }
    if (id_loan) {
        where.id_loan = id_loan
    }
    if (from_date && until_date) {
        where.date_to_pay = {
                [Op.between]: [
                    from_date,
                    until_date,
                ]
            }
    } else {
        if (until_date) {
            where.date_to_pay = {
                [Op.lte]: Date.now()
            }
        }
    }


    return Quota.findAll({
        where: where,
        order: [
            ['name', 'ASC']
        ]
    })
}

module.exports = getQuotasRepository