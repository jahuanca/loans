const { getPromise } = require("../../../utils/core/helpers")
const updateCustomerPaymentAccountUseCaseExecute = require("../../use_cases/customer_payment_account/update_customer_payment_account_use_case")

const updateCustomerPaymentAccountController = async (req, res, next) => {
    const { idUser, value } = req
    const [err, account] = await getPromise(updateCustomerPaymentAccountUseCaseExecute({ ...value, idUser }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(account)
}

module.exports = updateCustomerPaymentAccountController
