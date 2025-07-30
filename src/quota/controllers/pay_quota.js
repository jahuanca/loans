const { getPromise } = require("../../utils/core/helpers")
const payQuotaUseCaseExecute = require("../use_cases/pay_quota_use_case")

const payQuotaController = async (req, res) => {
    const {
        id_of_quota,
        paid_date,
    } = req.body
    const [err, quota] = await getPromise(
        payQuotaUseCaseExecute({ id_of_quota, paid_date })
    )
    if (err) return res.status(500).json({ message: err.message })
    if (quota == null) return res.status(404).json({ message: 'No se pudo editar la quota' })
    return res.status(200).json(quota)
}

module.exports = payQuotaController