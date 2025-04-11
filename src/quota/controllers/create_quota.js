const { getPromise } = require("../../utils/core/helpers")
const createQuotaUseCaseExecute = require("../use_cases/create_quota_use_case")

const createQuotaController = async (req, res) => {
    const {
        name,
        description,
        date,
    } = req.body
    const [err, quota] = await getPromise(createQuotaUseCaseExecute({
        name,
        description,
        date,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(quota)
}

module.exports = createQuotaController