const { getPromise } = require("../../core/helpers")
const createPaymentFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/create_payment_frequency_use_case")

const createPaymentFrequency = async (req, res, next) => {
    const {
        name,
        description,
        recommendedPercentage,
        monthlyInstallments,
        daysInstallment,
    } = req.body
    const [err, paymentFrequency] = await getPromise(
        createPaymentFrequencyUseCaseExecute({
            name,
            description,
            recommendedPercentage,
            monthlyInstallments,
            daysInstallment,
        })
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentFrequency)
}

module.exports = createPaymentFrequency