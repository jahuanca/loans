const { getPromise } = require("../../core/helpers")
const deletePaymentMethodUseCaseExecute = require("../../use_cases/payment_method/delete_payment_method_use_case")

const deletePaymentMethodController = async (req, res) => {

    const {
        id
    } = req.params

    const [err, paymentMethod] = await getPromise(
        deletePaymentMethodUseCaseExecute({ id })
    )
    if (err) return res.status(500).json({ message: err.message })
    if (paymentMethod == null) return res.status(404).json({ message: 'No se encontro dato.' })
    return res.status(200).json(paymentMethod)
}

module.exports= deletePaymentMethodController