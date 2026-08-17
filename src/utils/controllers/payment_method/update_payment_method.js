const { getPromise } = require("../../core/helpers")
const updatePaymentMethodUseCaseExecute = require("../../use_cases/payment_method/update_payment_method_use_case")

const updatePaymentMethodController = async (req, res, next) => {
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
    if (err) {
        return next(err)
    }
    return res.status(200).json(paymentMethod)
}

module.exports = updatePaymentMethodController