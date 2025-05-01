const { deletePaymentFrequencyRepository } = require("../../repositories/payment_frequency")

const deletePaymentFrequencyUseCaseExecute = ({id}) => deletePaymentFrequencyRepository({id})


module.exports = deletePaymentFrequencyUseCaseExecute