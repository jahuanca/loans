const { getPromise } = require("../../utils/core/helpers")
const updateCustomerExecute = require("../use_cases/update_customer_use_case")

const updateCustomerController = async (req, res) => {
    const {
        id,
        id_type_document,
        alias,
        name,
        lastName,
        address,
        latitude,
        longitude,
        document,
    } = req.body

    const [err, customer] = await getPromise(updateCustomerExecute({
        id,
        id_type_document,
        alias,
        name,
        lastName,
        address,
        latitude,
        longitude,
        document,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(customer)
}

module.exports = updateCustomerController