const { getPromise } = require("../../core/helpers")
const getQuotasByDateUseCaseExecute = require("./../../use_cases/dasboard/get_quotas_by_date_use_case")

const getQuotasByDateController = async (req, res) => {
    const { query } = req
    const [err, quotas] = await getPromise(getQuotasByDateUseCaseExecute(query))
    console.log(err)
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(quotas)
}

module.exports = getQuotasByDateController