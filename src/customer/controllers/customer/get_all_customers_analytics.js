const { getPromise } = require("../../../utils/core/helpers")
const getAllCustomersAnalyticsUseCaseExecute = require("../../use_cases/customer/get_all_customers_analytics_use_case")

const getAllCustomersAnalyticsController = async (req, res)=> {
    const [err, customers] = await getPromise(getAllCustomersAnalyticsUseCaseExecute())
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(customers)
}

module.exports = getAllCustomersAnalyticsController