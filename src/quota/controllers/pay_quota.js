const { getPromise } = require("../../utils/core/helpers")
const payQuotaUseCaseExecute = require("../use_cases/pay_quota_use_case")

const payQuotaController = async (req, res) => {
    const {
        idOfQuota: id,
        paidDate: date,
    } = req.body
    const [err, quota] = await getPromise(payQuotaUseCaseExecute({
        id,
        date,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(quota)
}

module.exports = payQuotaController