const { getPromise } = require("../../../utils/core/helpers")
const { getRenewalsUseCaseExecute } = require("../../use_cases")

const getRenewalsController = async (req, res, next) => {
    const [err, renewals] = await getPromise(
        getRenewalsUseCaseExecute()
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(renewals)
}

module.exports = getRenewalsController