const { getPromise } = require("../../../utils/core/helpers")
const updateCustomerManageDataUseCaseExecute = require("../../use_cases/customer/update_customer_manage_data_use_case")

const updateCustomerManageDataController = async (req, res, next) => {
    const { idUser, value } = req
    const [err, customer] = await getPromise(updateCustomerManageDataUseCaseExecute({ ...value, idUser }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(customer)
}

module.exports = updateCustomerManageDataController
