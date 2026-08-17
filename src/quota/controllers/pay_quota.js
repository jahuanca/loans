const { getPromise } = require("../../utils/core/helpers")
const payQuotaUseCaseExecute = require("../use_cases/pay_quota_use_case")

const payQuotaController = async (req, res, next) => {
    const { idUser } = req
    const {
        id_of_quota,
        paid_date,
    } = req.body
    const [err, quota] = await getPromise(
        payQuotaUseCaseExecute({ id_of_quota, paid_date, idUser })
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(quota)
}

module.exports = payQuotaController