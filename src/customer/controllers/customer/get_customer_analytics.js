const { getPromise } = require("../../../utils/core/helpers")
const getCustomersAnalyticsUseCaseExecute = require("../../use_cases/customer/get_customer_analytics_use_case")

const getCustomerAnalyticsController = async (req, res)=> {
    const { id_customer } = req.query
    const [err, customers] = await getPromise(getCustomersAnalyticsUseCaseExecute({
        id_customer
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(customers)
}

module.exports = getCustomerAnalyticsController