const { getPromise } = require("../../../utils/core/helpers")
const deleteCustomerPaymentAccountUseCaseExecute = require("../../use_cases/customer_payment_account/delete_customer_payment_account_use_case")

const deleteCustomerPaymentAccountController = async (req, res, next) => {
    const { id } = req.params
    const [err, account] = await getPromise(deleteCustomerPaymentAccountUseCaseExecute({ id }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(account)
}

module.exports = deleteCustomerPaymentAccountController
