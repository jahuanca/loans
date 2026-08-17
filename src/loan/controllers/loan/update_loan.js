const { getPromise } = require("./../../../utils/core/helpers")
const {
    updateLoanUseCaseExecute
} = require("./../../use_cases/")

const updateLoanController = async (req, res, next) => {
    const {
        id,
        name,
        description,
        start_date,
    } = req.body

    const [err, loan] = await getPromise(updateLoanUseCaseExecute({
        id,
        name,
        description,
        start_date,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loan)
}

module.exports = updateLoanController