const { getPromise } = require("./../../../utils/core/helpers")
const {
    createSpecialLoanUseCaseExecute
} = require("./../../use_cases/")

const createSpecialLoanController = async (req, res, next) => {
    const {
        idCustomer,
        idPaymentFrequency,
        idPaymentMethod,
        amount,
        percentage,
        startDate,
        ganancy,
        observation,
        idStateLoan,
        evidence,
        numberOfInstallments,
        daysBetweenInstallments,
    } = req.body
    const { idUser } = req
    const [err, loan] = await getPromise(createSpecialLoanUseCaseExecute({
        idCustomer,
        idUser: idUser,
        idPaymentFrequency,
        idPaymentMethod,
        amount,
        percentage,
        startDate,
        ganancy,
        observation,
        idStateLoan,
        evidence,
        numberOfInstallments,
        daysBetweenInstallments,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loan)
}

module.exports = createSpecialLoanController