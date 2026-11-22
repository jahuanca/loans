const { getPromise } = require("../../../utils/core/helpers")
const updateCustomerAddressUseCaseExecute = require("../../use_cases/customer_address/update_customer_address_use_case")

const updateCustomerAddressController = async (req, res, next) => {
    const { idUser, value } = req
    const [err, address] = await getPromise(updateCustomerAddressUseCaseExecute({ ...value, idUser }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(address)
}

module.exports = updateCustomerAddressController
