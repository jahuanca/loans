const { updatePaymentMethodRepository } = require("../../repositories/payment_method");

const updatePaymentMethodUseCaseExecute = ({
    id,
    name,
    description,
}) => updatePaymentMethodRepository({
    id,
    name,
    description,
})

module.exports = updatePaymentMethodUseCaseExecute