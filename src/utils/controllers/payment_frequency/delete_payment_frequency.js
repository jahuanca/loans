const { getPromise } = require("../../core/helpers")
const deletePaymentFrequencyUseCaseExecute = require("../../use_cases/payment_frequency/delete_payment_frequency_use_case")

const deletePaymentFrequencyController = async (req, res) => {
    const { id } = req.params
    const [err, paymentFrequency] = await getPromise(
        deletePaymentFrequencyUseCaseExecute({id})
    )
    if(err) return res.status(500).json({ message: err.message })
    if(paymentFrequency == null) return res.status(404).json({ message: 'No se encontro el dato.' })
    return res.status(200).json(paymentFrequency)
}

module.exports = deletePaymentFrequencyController