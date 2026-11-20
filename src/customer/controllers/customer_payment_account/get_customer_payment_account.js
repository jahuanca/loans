const { getPromise } = require("../../../utils/core/helpers")
const getCustomerPaymentAccountUseCaseExecute = require("../../use_cases/customer_payment_account/get_customer_payment_account_use_case")

const getCustomerPaymentAccountController = async (req, res, next) => {
    const { id } = req.params
    const [err, account] = await getPromise(getCustomerPaymentAccountUseCaseExecute({ id }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(account)
}

module.exports = getCustomerPaymentAccountController
