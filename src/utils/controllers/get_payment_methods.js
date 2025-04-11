const { getPromise } = require("../../utils/core/helpers")
const getPaymentMethodsUseCaseExecute = require("../use_cases/get_payment_methods_use_case copy")

const getPaymentMethodsController = async (req, res)=> {
    const [err, paymentMethods] = await getPromise(getPaymentMethodsUseCaseExecute())
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(paymentMethods)
}

module.exports = getPaymentMethodsController