const { getPromise } = require("../../../utils/core/helpers")
const getCustomersUseCaseExecute = require("./../../use_cases/customer/get_customers_use_case")

const getCustomersController = async (req, res, next)=> {
    const [err, customers] = await getPromise(getCustomersUseCaseExecute())
    if (err) {
        return next(err)
    }
    return res.status(200).json(customers)
}

module.exports = getCustomersController