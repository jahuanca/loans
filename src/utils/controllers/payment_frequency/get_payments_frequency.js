const { getPromise } = require("../../../utils/core/helpers")
const getPaymentsFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/get_payments_frequency_use_case")

const getPaymentsFrequencyController = async (req, res, next)=> {
    const [err, paymentsFrequency] = await getPromise(getPaymentsFrequencyUseCaseExecute())
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentsFrequency)
}

module.exports = getPaymentsFrequencyController