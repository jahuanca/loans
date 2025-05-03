const { createPaymentMethodRepository } = require("../../repositories/payment_method")

const createPaymentMethodUseCaseExecute = ({
    name,
    description,
}) => createPaymentMethodRepository({
    name,
    description,
})

module.exports = createPaymentMethodUseCaseExecute