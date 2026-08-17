const { getPromise } = require("../../core/helpers")
const deletePaymentFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/delete_payment_frequency_use_case")

const deletePaymentFrequencyController = async (req, res, next) => {
    const { id } = req.params
    const [err, paymentFrequency] = await getPromise(
        deletePaymentFrequencyUseCaseExecute({id})
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentFrequency)
}

module.exports = deletePaymentFrequencyController