const { getPromise } = require("../../core/helpers")
const getQuotasByDateUseCaseExecute = require("./../../use_cases/dasboard/get_quotas_by_date_use_case")

const getQuotasByDateController = async (req, res) => {
    const {
        id_state_quota,
        from_date,
        until_date,
    } = req.query
    const [err, quotas] = await getPromise(getQuotasByDateUseCaseExecute({
        id_state_quota,
        from_date,
        until_date,
    }))
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(quotas)
}

module.exports = getQuotasByDateController