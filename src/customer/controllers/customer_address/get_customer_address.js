const { getPromise } = require("../../../utils/core/helpers")
const getCustomerAddressUseCaseExecute = require("../../use_cases/customer_address/get_customer_address_use_case")

const getCustomerAddressController = async (req, res, next) => {
    const { id } = req.params
    const [err, address] = await getPromise(getCustomerAddressUseCaseExecute({ id }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(address)
}

module.exports = getCustomerAddressController
