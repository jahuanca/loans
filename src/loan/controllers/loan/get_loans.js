const { getPromise } = require("./../../../utils/core/helpers")
const {
    getLoansUseCaseExecute
} = require("./../../use_cases/")

const getLoansController = async (req, res)=> {
    const {
        id_customer,
        id_state_loan,
    } = req.query
    const [err, loans] = await getPromise(getLoansUseCaseExecute({
        id_customer,
        id_state_loan,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(loans)
}

module.exports = getLoansController