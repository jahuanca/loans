const { getPromise } = require("../../../utils/core/helpers")
const updateCustomerPersonalDataUseCaseExecute = require("../../use_cases/customer/update_customer_personal_data_use_case")

const updateCustomerPersonalDataController = async (req, res, next) => {
    const { idUser, value } = req
    const [err, customer] = await getPromise(updateCustomerPersonalDataUseCaseExecute({ ...value, idUser }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(customer)
}

module.exports = updateCustomerPersonalDataController
