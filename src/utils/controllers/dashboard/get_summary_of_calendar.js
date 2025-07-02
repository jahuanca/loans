const { getPromise } = require("../../core/helpers")
const getSummaryOfCalendarUseCaseExecute = require("../../use_cases/dasboard/get_summary_of_calendar_use_case")

const getSummaryOfCalendarController = async (req, res)=> {
    const [err, summary] = await getPromise(
        getSummaryOfCalendarUseCaseExecute()
    )
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(summary)
}

module.exports = getSummaryOfCalendarController