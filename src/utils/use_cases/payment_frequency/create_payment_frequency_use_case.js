const { createPaymentFrequencyRepository } = require("../../repositories/payment_frequency")

const createPaymentFrequencyUseCaseExecute = ({
    name,
    description,
    recommended_percentage,
    monthly_installments,
    days_installment,
})=> createPaymentFrequencyRepository({
    name,
    description,
    recommended_percentage,
    monthly_installments,
    days_installment,
})

module.exports = createPaymentFrequencyUseCaseExecute