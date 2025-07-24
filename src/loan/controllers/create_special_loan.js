const { getPromise } = require("../../utils/core/helpers")
const createSpecialLoanUseCaseExecute = require("../use_cases/create_special_loan_use_case")

const createSpecialLoanController = async (req, res) => {
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
        number_of_installments,
        days_between_installments,
    } = req.body
    const { idUser } = req
    const [err, loan] = await getPromise(createSpecialLoanUseCaseExecute({
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
        number_of_installments,
        days_between_installments,
    }))
    if (err) return res.status(500).json({ message: err.message })
    if (loan == null) res.status(404).json({ message: 'El préstamo no se pudo procesar' })
    return res.status(200).json(loan)
}

module.exports = createSpecialLoanController