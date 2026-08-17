const { getPromise } = require("./../../../utils/core/helpers")
const {
    deleteLoanUseCaseExecute
} = require("./../../use_cases/")

const deleteLoanController = async (req, res, next) => {
    const {id} = req.params
    const [err, loan] = await getPromise(deleteLoanUseCaseExecute({id}))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loan)
}

module.exports = deleteLoanController