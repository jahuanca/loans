const { getPromise } = require("../../../utils/core/helpers")
const deleteCustomerAddressUseCaseExecute = require("../../use_cases/customer_address/delete_customer_address_use_case")

const deleteCustomerAddressController = async (req, res, next) => {
    const { id } = req.params
    const [err, address] = await getPromise(deleteCustomerAddressUseCaseExecute({ id }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(address)
}

module.exports = deleteCustomerAddressController
