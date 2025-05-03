const { getPromise } = require("../../core/helpers")
const updatePaymentMethodUseCaseExecute = require("../../use_cases/payment_method/update_payment_method_use_case")

const updatePaymentMethodController = async (req, res) => {
    const {
        id,
        name, 
        description,
    } = req.body

    const [err, paymentMethod] = await getPromise(updatePaymentMethodUseCaseExecute({
        id,
        name,
        description,
    }))
    if (err) return res.status(500).json({message: err.message})
    if (paymentMethod == null) return res.status(404).json({message: 'No se encontro dato.'})
    return res.status(200).json(paymentMethod)
}

module.exports = updatePaymentMethodController