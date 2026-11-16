const PaymentFrequency = require("../../db/models/payment_frequency_model")

const createPaymentFrequencyRepository = ({
    name,
    description,
    recommendedPercentage,
    monthlyInstallments,
    daysInstallment,
}) => PaymentFrequency.create(
    {
        name,
        description,
        recommendedPercentage,
        monthlyInstallments,
        daysInstallment,
    }
)

module.exports = createPaymentFrequencyRepository