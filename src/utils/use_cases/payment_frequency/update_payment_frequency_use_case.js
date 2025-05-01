const { updatePaymentFrequencyRepository } = require("../../repositories/payment_frequency")

const updatePaymentFrequencyUseCaseExecute = ({
    id,
    name,
    description,
    recommended_percentage,
    monthly_installments,
    days_installment,
}) => updatePaymentFrequencyRepository({
    id,
    name,
    description,
    recommended_percentage,
    monthly_installments,
    days_installment,
})

module.exports = updatePaymentFrequencyUseCaseExecute