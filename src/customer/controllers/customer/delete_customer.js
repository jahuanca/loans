const { getPromise } = require("../../../utils/core/helpers")
const deleteCustomerExecute = require("../../use_cases/customer/delete_customer_use_case")

const deleteCustomerController = async (req, res, next) => {
    const {id} = req.params
    const [err, customer] = await getPromise(deleteCustomerExecute({id}))
    if (err) {
        return next(err)
    }
    return res.status(200).json(customer)
}

module.exports = deleteCustomerController