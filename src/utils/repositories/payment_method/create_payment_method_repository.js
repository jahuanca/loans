const PaymentMethod = require("../../db/payment_method_model")

const createPaymentMethodRepository = ({
    name,
    description,
}) => PaymentMethod.create({
    name,
    description,
})

module.exports = createPaymentMethodRepository