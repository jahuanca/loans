const { getPromise } = require("../../../utils/core/helpers")
const getPaymentMethodsUseCaseExecute = require("../../use_cases/payment_method/get_payment_methods_use_case")

const getPaymentMethodsController = async (req, res, next)=> {
    const [err, paymentMethods] = await getPromise(getPaymentMethodsUseCaseExecute())
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentMethods)
}

module.exports = getPaymentMethodsController