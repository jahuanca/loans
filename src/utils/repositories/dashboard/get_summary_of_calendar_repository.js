const Quota = require("../../../quota/db/quota_model")
const { idOfPendingQuota } = require("../../core/constants")
const { Op } = require("sequelize")
const { initialOfDay, finalOfDay } = require("../../core/helpers")
const { startOfWeek, endOfWeek } = require("date-fns")

const getSummaryOfCalendarRepository = async () => {

    const overduePayments = await Quota.count({
        where: {
            id_state_quota: idOfPendingQuota,
            date_to_pay: {
                [Op.lte]: finalOfDay()
            }
        }
    })

    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
    const endWeek = endOfWeek(new Date())
    const paymentsOfToday = await Quota.count({
        where: {
            date_to_pay: {
                [Op.between]: [
                    startWeek,
                    endWeek,
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