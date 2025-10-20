const { getPromise } = require("../../../utils/core/helpers")
const { getRenewalsUseCaseExecute } = require("../../use_cases")

const getRenewalsController = async (req, res) => {
    const [err, renewals] = await getPromise(
        getRenewalsUseCaseExecute()
    )
    if (err) return res.status(500).json({message: err})
    if (renewals == null) return res.status(404).json({message: 'Renewals nulos.'})
    res.status(200).json(renewals)
}

module.exports = getRenewalsController