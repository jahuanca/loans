const PaymentMethod = require("../../db/payment_method_model");

const deletePaymentMethodRepository = async ({id}) => {
    const paymentMethod = await PaymentMethod.findByPk(id)
    if(paymentMethod != null) await paymentMethod.destroy();
   return paymentMethod
}

module.exports = deletePaymentMethodRepository