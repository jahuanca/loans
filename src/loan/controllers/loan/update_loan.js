const { getPromise } = require("./../../../utils/core/helpers")
const {
    updateLoanUseCaseExecute
} = require("./../../use_cases/")

const updateLoanController = async (req, res, next) => {
    const {
        id,
        name,
        description,
        startDate,
    } = req.body

    const [err, loan] = await getPromise(updateLoanUseCaseExecute({
        id,
        name,
        description,
        startDate,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loan)
}

module.exports = updateLoanController