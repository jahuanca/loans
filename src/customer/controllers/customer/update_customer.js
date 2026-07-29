const { getPromise } = require("../../../utils/core/helpers")
const updateCustomerExecute = require("../../use_cases/customer/update_customer_use_case")

const updateCustomerController = async (req, res) => {
    const { value } = req

    const [err, customer] = await getPromise(updateCustomerExecute(value))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(customer)
}

module.exports = updateCustomerController