const { getPromise } = require("../../../utils/core/helpers")
const getCustomersAnalyticsUseCaseExecute = require("../../use_cases/customer/get_customer_analytics_use_case")

const getCustomerAnalyticsController = async (req, res, next)=> {
    const { idCustomer } = req.query
    const [err, customers] = await getPromise(getCustomersAnalyticsUseCaseExecute({
        idCustomer
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(customers)
}

module.exports = getCustomerAnalyticsController