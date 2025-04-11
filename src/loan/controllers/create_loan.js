const { getPromise } = require("../../utils/core/helpers")
const createLoanUseCaseExecute = require("../use_cases/create_loan_use_case")

const createLoanController = async (req, res) => {
    console.log(req.body)
    const {
        id_customer,
        id_user,
        id_payment_frequency,
        id_payment_method,
        amount,
        percentage,
        date,
        ganancy,
        observation,
        id_state_loan,
        evidence,
    } = req.body
    const [err, loan] = await getPromise(createLoanUseCaseExecute({
        id_customer,
        id_user,
        id_payment_frequency,
        id_payment_method,
        amount,
        percentage,
        date,
        ganancy,
        observation,
        id_state_loan,
        evidence,
    }))
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(loan)
}

module.exports = createLoanController