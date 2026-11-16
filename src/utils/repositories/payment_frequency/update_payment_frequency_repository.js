const PaymentFrequency = require("../../db/models/payment_frequency_model")

const updatePaymentFrequencyRepository = async ({
    id,
    name,
    description,
    recommendedPercentage,
    monthlyInstallments,
    daysInstallment,
}) => {
    const paymentFrequency = await PaymentFrequency.findByPk(id)
    if (paymentFrequency == null) return paymentFrequency
    await paymentFrequency.update({
        name,
        description,
        recommendedPercentage,
        monthlyInstallments,
        daysInstallment,
    })
    await paymentFrequency.save()
    await paymentFrequency.reload()
    return paymentFrequency
}

module.exports = updatePaymentFrequencyRepository