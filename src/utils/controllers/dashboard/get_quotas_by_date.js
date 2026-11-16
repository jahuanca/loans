const { getPromise } = require("../../core/helpers")
const getQuotasByDateUseCaseExecute = require("./../../use_cases/dasboard/get_quotas_by_date_use_case")

const getQuotasByDateController = async (req, res, next) => {
    const {
        idStateQuota,
        fromDate,
        untilDate,
    } = req.query
    const [err, quotas] = await getPromise(getQuotasByDateUseCaseExecute({
        idStateQuota,
        fromDate,
        untilDate,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(quotas)
}

module.exports = getQuotasByDateController