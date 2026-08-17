const { getPromise } = require("../../../utils/core/helpers")
const {
    getLoanUseCaseExecute
} = require("../../use_cases")

const getLoanController = async (req, res, next)=> {
    const {
        id,
    } = req.params
    const [err, loan] = await getPromise(getLoanUseCaseExecute({id}))
    if (err) {
        return next(err)
    }
    res.status(200).json(loan)
}

module.exports = getLoanController