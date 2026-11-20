const { deleteCustomerPaymentAccountRepository } = require("../../repositories/customer_payment_account")

const deleteCustomerPaymentAccountUseCaseExecute = ({ id }) => deleteCustomerPaymentAccountRepository({ id })

module.exports = deleteCustomerPaymentAccountUseCaseExecute
