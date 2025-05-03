const deletePaymentMethodRepository = require("../../repositories/payment_method/delete_payment_method_repository");

const deletePaymentMethodUseCaseExecute = ({id}) => deletePaymentMethodRepository({id})

module.exports = deletePaymentMethodUseCaseExecute