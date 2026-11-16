const { getPromise } = require("./../../../utils/core/helpers")
const {
    getLoansUseCaseExecute
} = require("./../../use_cases/")

const getLoansController = async (req, res, next)=> {
    const {
        idCustomer,
        idStateLoan,
    } = req.query
    const [err, loans] = await getPromise(getLoansUseCaseExecute({
        idCustomer,
        idStateLoan,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(loans)
}

module.exports = getLoansController