const { getPromise } = require("./../../../utils/core/helpers")
const {
    validateLoanUseCaseExecute
} = require("./../../use_cases/")

const validateLoanController = async (req, res, next) => {
    const {
        idCustomer,
        idPaymentFrequency,
        amount,
        percentage,
        startDate,
    } = req.body
    const [err, loan] = await getPromise(validateLoanUseCaseExecute({
        idCustomer,
        idPaymentFrequency,
        amount,
        percentage,
        startDate,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loan)
}

module.exports = validateLoanController