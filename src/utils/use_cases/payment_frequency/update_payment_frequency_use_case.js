const { updatePaymentFrequencyRepository } = require("../../repositories/payment_frequency")

const updatePaymentFrequencyUseCaseExecute = ({
    id,
    name,
    description,
    recommendedPercentage,
    monthlyInstallments,
    daysInstallment,
}) => updatePaymentFrequencyRepository({
    id,
    name,
    description,
    recommendedPercentage,
    monthlyInstallments,
    daysInstallment,
})

module.exports = updatePaymentFrequencyUseCaseExecute