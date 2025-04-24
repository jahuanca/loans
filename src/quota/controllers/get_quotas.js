const { getPromise } = require("../../utils/core/helpers")
const getQuotasUseCaseExecute = require("../use_cases/get_quotas_use_case")

const getQuotasController = async (req, res)=> {
    const query = req.query
    const [err, quotas] = await getPromise(getQuotasUseCaseExecute(query))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(quotas)
}

module.exports = getQuotasController