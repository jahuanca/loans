const { getPromise } = require("../../../utils/core/helpers")
const createCustomerAddressUseCaseExecute = require("../../use_cases/customer_address/create_customer_address_use_case")

const createCustomerAddressController = async (req, res, next) => {
    const { idUser, value } = req
    const [err, address] = await getPromise(createCustomerAddressUseCaseExecute({ ...value, idUser }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(address)
}

module.exports = createCustomerAddressController
