const { getPromise } = require("../../core/helpers");
const updatePaymentFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/update_payment_frequency_use_case");

const updatePaymentFrequencyController = async (req, res, next) => {
    const {
        id,
        name,
        description,
        recommendedPercentage,
        monthlyInstallments,
        daysInstallment,
    } = req.body
    const [err, paymentFrequency] = await getPromise(
        updatePaymentFrequencyUseCaseExecute({
            id,
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

module.exports = updatePaymentFrequencyController