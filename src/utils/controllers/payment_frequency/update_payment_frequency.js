const { getPromise } = require("../../core/helpers");
const updatePaymentFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/update_payment_frequency_use_case");

const updatePaymentFrequencyController = async (req, res, next) => {
    const {
        id,
        name,
        description,
        recommended_percentage,
        monthly_installments,
        days_installment,
    } = req.body
    const [err, paymentFrequency] = await getPromise(
        updatePaymentFrequencyUseCaseExecute({
            id,
            name,
            description,
            recommended_percentage,
            monthly_installments,
            days_installment,
        })
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentFrequency)
}

module.exports = updatePaymentFrequencyController