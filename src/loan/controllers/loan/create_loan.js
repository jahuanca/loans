const { getPromise } = require("./../../../utils/core/helpers")
const {
    createLoanUseCaseExecute
} = require("./../../use_cases/")

const createLoanController = async (req, res) => {
    const {
        id_customer,
        id_payment_frequency,
        id_payment_method,
        amount,
        percentage,
        start_date,
        ganancy,
        observation,
        id_state_loan,
        evidence,
    } = req.body
    const { idUser } = req
    const [err, loan] = await getPromise(createLoanUseCaseExecute({
        id_customer,
        id_user: idUser,
        id_payment_frequency,
        id_payment_method,
        amount,
        percentage,
        start_date,
        ganancy,
        observation,
        id_state_loan,
        evidence,
    }))
    if (err) return res.status(500).json({ message: err.message })
    if (loan == null) return res.status(404).json({ message: 'No se pudo crear el prestamo' })
    return res.status(200).json(loan)
}

module.exports = createLoanController