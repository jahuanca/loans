const { getPromise } = require("../core/helpers")
const getSummaryUseCaseExecute = require("../use_cases/get_summary_use_case")

const getSummaryController = async (req, res)=> {
    const [err, summary] = await getPromise(
        getSummaryUseCaseExecute()
    )
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(summary)
}

module.exports = getSummaryController