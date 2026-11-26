const { getPromise } = require("../../core/helpers")
const getPaymentProvidersUseCaseExecute = require("../../use_cases/payment_provider/get_payment_providers_use_case")

const getPaymentProvidersController = async (req, res, next) => {
    const [err, paymentProviders] = await getPromise(getPaymentProvidersUseCaseExecute())
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentProviders)
}

module.exports = getPaymentProvidersController
