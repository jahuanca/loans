const { getPromise } = require("../../utils/core/helpers")
const createCustomerUseCaseExecute = require("../use_cases/create_customer_use_case")

const createCustomerController = async (req, res) => {
    const {
        name,
        lastName,
        address,
        latitude,
        longitude,
        id_type_document,
        document,
    } = req.body
    const [err, customer] = await getPromise(createCustomerUseCaseExecute({
        name,
        lastName,
        address,
        latitude,
        longitude,
        id_type_document,
        document,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(customer)
}

module.exports = createCustomerController