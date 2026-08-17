const { getPromise } = require("../../core/helpers")
const getNextRenewalUseCaseExecute = require("../../use_cases/dasboard/get_next_renewal_use_case")

const getNextRenewalController = async (req, res, next) => {
    const [err, summaryMonths] = await getPromise(
        getNextRenewalUseCaseExecute()
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(summaryMonths)
}

module.exports = getNextRenewalController