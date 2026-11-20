const { getCustomerPaymentAccountRepository } = require("../../repositories/customer_payment_account")

const getCustomerPaymentAccountUseCaseExecute = ({ id }) => getCustomerPaymentAccountRepository({ id })

module.exports = getCustomerPaymentAccountUseCaseExecute
