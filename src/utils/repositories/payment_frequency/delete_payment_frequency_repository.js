const PaymentFrequency = require("../../db/payment_frequency_model")

const  deletePaymentFrequencyRepository = async ({id}) => {
   const paymentFrequency = await PaymentFrequency.findByPk(id)
   if(paymentFrequency != null) await paymentFrequency.destroy();
   return paymentFrequency
}

module.exports = deletePaymentFrequencyRepository