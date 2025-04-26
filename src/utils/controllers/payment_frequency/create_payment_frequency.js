const { getPromise } = require("../../core/helpers")
const createPaymentFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/create_payment_frequency_use_case")

const createPaymentFrequency = async (req, res) => {
    const {
        name,
        description,
        recommended_percentage,
        monthly_installments,
        days_installment,
    } = req.body
    const [err, paymentFrequency] = await getPromise(
        createPaymentFrequencyUseCaseExecute({
            name,
            description,
            recommended_percentage,
            monthly_installments,
            days_installment,
        })
    )
    if (err) res.status(500).json({ message: err.message })
    return res.status(200).json(paymentFrequency)
}

module.exports = createPaymentFrequency