const CustomerPaymentAccount = require("../../db/customer_payment_account_model")

// Borrado logico (paranoid): se llena deleted_at.
const deleteCustomerPaymentAccountRepository = async ({ id }) => {
    const accountToDelete = await CustomerPaymentAccount.findByPk(id)
    if (accountToDelete == null) throw Error('No se encontro registro')
    await accountToDelete.destroy()
    return accountToDelete
}

module.exports = deleteCustomerPaymentAccountRepository
