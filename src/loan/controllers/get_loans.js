const { getPromise } = require("../../utils/core/helpers")
const getLoansUseCaseExecute = require("../use_cases/get_loans_use_case")

const getLoansController = async (req, res)=> {
    
    const [err, loans] = await getPromise(getLoansUseCaseExecute())
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(loans)
}

module.exports = getLoansController