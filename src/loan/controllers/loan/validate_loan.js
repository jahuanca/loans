const { getPromise } = require("./../../../utils/core/helpers")
const {
    validateLoanUseCaseExecute
} = require("./../../use_cases/")

const validateLoanController = async (req, res) => {
    const {
        id_customer,
        id_payment_frequency,
        amount,
        percentage,
        start_date,
    } = req.body
    const [err, loan] = await getPromise(validateLoanUseCaseExecute({
        id_customer,
        id_payment_frequency,
        amount,
        percentage,
        start_date,
    }))
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(loan)
}

module.exports = validateLoanController