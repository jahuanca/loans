const { getPromise } = require("../../utils/core/helpers")
const getQuotaUseCaseExecute = require("../use_cases/get_quota_use_case")

const getQuotasController = async (req, res, next)=> {
    const {
        id
    } = req.params
    const [err, quotas] = await getPromise(getQuotaUseCaseExecute(id))
    if (err) {
        return next(err)
    }
    return res.status(200).json(quotas)
}

module.exports = getQuotasController