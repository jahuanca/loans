const { getPromise } = require("../../core/helpers")
const getNextRenewalUseCaseExecute = require("../../use_cases/dasboard/get_next_renewal_use_case")

const getNextRenewalController = async (req, res) => {
    const [err, summaryMonths] = await getPromise(
        getNextRenewalUseCaseExecute()
    )
    if (err) return res.status(500).json({ message: err.message })
    if (summaryMonths == null) return res.status(400).json({ message: 'No se encontró resumen de mes' })
    return res.status(200).json(summaryMonths)
}

module.exports = getNextRenewalController