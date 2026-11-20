const { getPromise } = require("../../../utils/core/helpers")
const createCustomerPaymentAccountUseCaseExecute = require("../../use_cases/customer_payment_account/create_customer_payment_account_use_case")

const createCustomerPaymentAccountController = async (req, res, next) => {
    const { idUser, value } = req
    const [err, account] = await getPromise(createCustomerPaymentAccountUseCaseExecute({ ...value, idUser }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(account)
}

module.exports = createCustomerPaymentAccountController
