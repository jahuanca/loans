const { getPromise } = require("../../utils/core/helpers")
const deleteQuotaExecute = require("../use_cases/delete_quota_use_case")

const deleteQuotaController = async (req, res, next) => {
    const {id} = req.params
    const [err, quota] = await getPromise(deleteQuotaExecute({id}))
    if (err) {
        return next(err)
    }
    return res.status(200).json(quota)
}

module.exports = deleteQuotaController