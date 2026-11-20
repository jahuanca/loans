const { getCustomerPaymentAccountsRepository } = require("../../repositories/customer_payment_account")

const getCustomerPaymentAccountsUseCaseExecute = ({ idCustomer }) => getCustomerPaymentAccountsRepository({ idCustomer })

module.exports = getCustomerPaymentAccountsUseCaseExecute
