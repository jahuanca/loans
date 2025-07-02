const { getPromise } = require("../../core/helpers")
const getSummaryOfDashboardUseCaseExecute = require("../../use_cases/dasboard/get_summary_of_dashboard_use_case")

const getSummaryOfDashboardController = async (req, res)=> {
    const [err, summary] = await getPromise(
        getSummaryOfDashboardUseCaseExecute()
    )
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(summary)
}

module.exports = getSummaryOfDashboardController