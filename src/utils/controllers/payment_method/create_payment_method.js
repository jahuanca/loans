const { getPromise } = require("../../core/helpers")
const createPaymentMethodUseCaseExecute = require("../../use_cases/payment_method/create_payment_method_use_case")

const createPaymentMethodController = async (req, res, next) => {
    const {
        name, 
        description,
    } = req.body

    const [err, paymentMethod] = await getPromise(createPaymentMethodUseCaseExecute({
        name,
        description,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentMethod)
}

module.exports = createPaymentMethodController