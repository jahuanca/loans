const { createPaymentFrequencyRepository } = require("../../repositories/payment_frequency")

const createPaymentFrequencyUseCaseExecute = ({
    name,
    description,
    recommendedPercentage,
    monthlyInstallments,
    daysInstallment,
})=> createPaymentFrequencyRepository({
    name,
    description,
    recommendedPercentage,
    monthlyInstallments,
    daysInstallment,
})

module.exports = createPaymentFrequencyUseCaseExecute