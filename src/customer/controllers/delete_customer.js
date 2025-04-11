const { getPromise } = require("../../utils/core/helpers")
const deleteCustomerExecute = require("../use_cases/delete_customer_use_case")

const deleteCustomerController = async (req, res) => {
    const {id} = req.params
    const [err, customer] = await getPromise(deleteCustomerExecute({id}))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(customer)
}

module.exports = deleteCustomerController