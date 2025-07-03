const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")
const { getFormatDate } = require("../../core/formats")
const { idOfPendingQuota } = require("../../core/constants")
const { Op } = require("sequelize")
const { initialOfDay, finalOfDay } = require("../../core/helpers")

const getSummaryOfCalendarRepository = async () => {

    const overduePayments = await Quota.count({
        where: {
            id_state_quota: idOfPendingQuota,
            date_to_pay: {
                [Op.gte]: Date.now()
            }
        }
    })

    const paymentsOfToday = await Quota.count({
        where: {
            id_state_quota: idOfPendingQuota,
            date_to_pay: {
                [Op.between]: [
                    initialOfDay(),
                    finalOfDay(),
                ]
            }
        }
    })

    return {
        'overdue_payments': overduePayments,
        'payments_of_today': paymentsOfToday, 
    }
}

module.exports = getSummaryOfCalendarRepository