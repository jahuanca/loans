const { getPromise } = require("../../../utils/core/helpers")
const createCustomerUseCaseExecute = require("../../use_cases/customer/create_customer_use_case")

const createCustomerController = async (req, res, next) => {
    const { idUser, value } = req

    const [err, customer] = await getPromise(createCustomerUseCaseExecute({
        ...value,
        idUser,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(customer)
}

module.exports = createCustomerController