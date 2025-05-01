const PaymentFrequency = require("../../db/payment_frequency_model")

const updatePaymentFrequencyRepository = async ({
    id,
    name,
    description,
    recommended_percentage,
    monthly_installments,
    days_installment,
}) => {
    const paymentFrequency = await PaymentFrequency.findByPk(id)
    if (paymentFrequency == null) return paymentFrequency
    await paymentFrequency.update({
        name,
        description,
        recommended_percentage,
        monthly_installments,
        days_installment,
    })
    await paymentFrequency.save()
    return paymentFrequency
}

module.exports = updatePaymentFrequencyRepository