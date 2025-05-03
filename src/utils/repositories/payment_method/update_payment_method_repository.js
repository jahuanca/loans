const PaymentMethod = require("../../db/payment_method_model")

const updatePaymentMethodRepository = async ({
    id,
    name,
    description,
}) => {
    const paymentMethod = await PaymentMethod.findByPk(id)
    if(paymentMethod == null) return paymentMethod
    await paymentMethod.update({
        name,
        description,
    })
    await paymentMethod.save()
    await paymentMethod.reload()
    return paymentMethod
}

module.exports = updatePaymentMethodRepository