const { getPromise } = require("../../core/helpers")
const getCustomersWithouLoanUseCase = require("../../use_cases/dasboard/get_customers_without_loan_use_case")

const getCustomersWithoutLoanController = async (req, res) => {
    const [err, customers] = await getPromise(getCustomersWithouLoanUseCase())
    if (err) return res.status(500).json({ message: err.message })
    if (customers == null) return res.status(400).json({ message: 'No se encontró customers' })
    return res.status(200).json(customers)
}

module.exports = getCustomersWithoutLoanController