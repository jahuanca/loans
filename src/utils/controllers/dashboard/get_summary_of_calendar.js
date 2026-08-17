const { getPromise } = require("../../core/helpers")
const getSummaryOfCalendarUseCaseExecute = require("../../use_cases/dasboard/get_summary_of_calendar_use_case")

const getSummaryOfCalendarController = async (req, res, next)=> {
    const [err, summary] = await getPromise(
        getSummaryOfCalendarUseCaseExecute()
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(summary)
}

module.exports = getSummaryOfCalendarController