const { getPromise } = require("./../../../utils/core/helpers")
const {
    createLoanUseCaseExecute
} = require("./../../use_cases/")

const createLoanController = async (req, res, next) => {
    const {
        idCustomer,
        idLoanToRenew,
        idPaymentFrequency,
        idPaymentMethod,
        amount,
        percentage,
        startDate,
        ganancy,
        observation,
        idStateLoan,
        evidence,
    } = req.body
    const { idUser } = req
    const [err, loan] = await getPromise(createLoanUseCaseExecute({
        idCustomer,
        idLoanToRenew,
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
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loan)
}

module.exports = createLoanController