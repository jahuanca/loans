const { getPromise } = require("../../../utils/core/helpers")
const getTypesCustomerUseCaseExecute = require("../../use_cases/type_customer/get_types_customer_use_case")

const getTypesCustomerController = async (req, res, next) => {
    const [err, customers] = await getPromise(getTypesCustomerUseCaseExecute())
    if (err) {
        return next(err)
    }
    return res.status(200).json(customers)
}

module.exports = getTypesCustomerController