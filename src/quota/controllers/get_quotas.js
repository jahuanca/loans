const { getPromise } = require("../../utils/core/helpers")
const getQuotasUseCaseExecute = require("../use_cases/get_quotas_use_case")

const getQuotasController = async (req, res) => {
    const {
        id_loan,
    } = req.query
    const [err, quotas] = await getPromise(getQuotasUseCaseExecute({
        id_loan,
    }))
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(quotas)
}

module.exports = getQuotasController