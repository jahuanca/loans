const { getPromise } = require("../../utils/core/helpers")
const updateQuotaExecute = require("../use_cases/update_quota_use_case")

const updateQuotaController = async (req, res) => {
    const {
        id,
        name,
        description,
        date,
    } = req.body

    const [err, quota] = await getPromise(updateQuotaExecute({
        id,
        name,
        description,
        date,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(quota)
}

module.exports = updateQuotaController