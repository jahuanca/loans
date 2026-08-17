const { getPromise } = require("../../core/helpers")
const getSummaryMonthsUseCaseExecute = require("../../use_cases/dasboard/get_summary_months_use_case")

const getSummaryMonthsController = async (req, res, next) => {
    const [err, summaryMonths] = await getPromise(
        getSummaryMonthsUseCaseExecute()
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(summaryMonths)
}

module.exports = getSummaryMonthsController