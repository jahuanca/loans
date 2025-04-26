const PaymentFrequency = require("../../db/payment_frequency_model")

const createPaymentFrequencyRepository = ({
    name,
    description,
    recommended_percentage,
    monthly_installments,
    days_installment,
}) => PaymentFrequency.create(
    {
        name,
        description,
        recommended_percentage,
        monthly_installments,
        days_installment,
    }
)

module.exports = createPaymentFrequencyRepository