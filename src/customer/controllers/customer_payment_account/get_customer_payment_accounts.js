const { getPromise } = require("../../../utils/core/helpers")
const getCustomerPaymentAccountsUseCaseExecute = require("../../use_cases/customer_payment_account/get_customer_payment_accounts_use_case")

const getCustomerPaymentAccountsController = async (req, res, next) => {
    const { idCustomer } = req.params
    const [err, accounts] = await getPromise(getCustomerPaymentAccountsUseCaseExecute({ idCustomer }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(accounts)
}

module.exports = getCustomerPaymentAccountsController
