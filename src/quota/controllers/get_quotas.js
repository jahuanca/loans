const { getPromise } = require("../../utils/core/helpers")
const getQuotasUseCaseExecute = require("../use_cases/get_quotas_use_case")

const getQuotasController = async (req, res, next) => {
    const {
        idLoan,
    } = req.query
    const [err, quotas] = await getPromise(getQuotasUseCaseExecute({
        idLoan,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(quotas)
}

module.exports = getQuotasController