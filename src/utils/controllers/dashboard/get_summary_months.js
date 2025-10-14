const { getPromise } = require("../../core/helpers")
const getSummaryMonthsUseCaseExecute = require("../../use_cases/dasboard/get_summary_months_use_case")

const getSummaryMonthsController = async (req, res) => {
    const [err, summaryMonths] = await getPromise(
        getSummaryMonthsUseCaseExecute()
    )
    if (err) return res.status(500).json({ message: err.message })
    if (summaryMonths == null) return res.status(400).json({ message: 'No se encontró resumen de mes' })
    return res.status(200).json(summaryMonths)
}

module.exports = getSummaryMonthsController