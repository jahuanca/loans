const { getPromise } = require("../../../utils/core/helpers")
const getCustomerAddressesUseCaseExecute = require("../../use_cases/customer_address/get_customer_addresses_use_case")

const getCustomerAddressesController = async (req, res, next) => {
    const { idCustomer } = req.params
    const [err, addresses] = await getPromise(getCustomerAddressesUseCaseExecute({ idCustomer }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(addresses)
}

module.exports = getCustomerAddressesController
