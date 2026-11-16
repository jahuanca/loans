const Quota = require("../../../quota/db/quota_model")
const { idOfPendingQuota } = require("../../core/constants")
const { Op } = require("sequelize")
const { initialOfDay, finalOfDay } = require("../../core/helpers")
const { startOfWeek, endOfWeek } = require("date-fns")

const getSummaryOfCalendarRepository = async () => {

    const overduePayments = await Quota.count({
        where: {
            idStateQuota: idOfPendingQuota,
            dateToPay: {
                [Op.lte]: finalOfDay()
            }
        }
    })

    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
    const endWeek = endOfWeek(new Date())
    const paymentsOfToday = await Quota.count({
        where: {
            dateToPay: {
                [Op.between]: [
                    startWeek,
                    endWeek,
                ]
            }
        }
    })

    return {
        'overduePayments': overduePayments,
        'paymentsOfToday': paymentsOfToday, 
    }
}

module.exports = getSummaryOfCalendarRepository