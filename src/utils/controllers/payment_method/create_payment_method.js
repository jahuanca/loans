const { getPromise } = require("../../core/helpers")
const createPaymentMethodUseCaseExecute = require("../../use_cases/payment_method/create_payment_method_use_case")

const createPaymentMethodController = async (req, res) => {
    const {
        name, 
        description,
    } = req.body

    const [err, paymentMethod] = await getPromise(createPaymentMethodUseCaseExecute({
        name,
        description,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(paymentMethod)
}

module.exports = createPaymentMethodController