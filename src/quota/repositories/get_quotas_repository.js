const { Op } = require("sequelize");
const Quota = require("../db/quota_model");
const Loan = require("../../loan/db/loan_model");

const getQuotasRepository = ({
    idLoan,
    idStateQuota,
    fromDate,
    untilDate,
}) => {

    let where = {}

    if (idStateQuota) {
        where.idStateQuota = idStateQuota
    }
    if (idLoan) {
        where.idLoan = idLoan
    }
    if (fromDate && untilDate) {
        where.dateToPay = {
                [Op.between]: [
                    fromDate,
                    untilDate,
                ]
            }
    } else {
        if (untilDate) {
            where.dateToPay = {
                [Op.lte]: Date.now()
            }
        }
    }


    return Quota.findAll({
        where: where,
        order: [
            ['dateToPay', 'ASC']
        ]
    })
}

module.exports = getQuotasRepository