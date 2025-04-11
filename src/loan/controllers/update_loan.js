const { getPromise } = require("../../utils/core/helpers")
const updateLoanExecute = require("../use_cases/update_loan_use_case")

const updateLoanController = async (req, res) => {
    const {
        id,
        name,
        description,
        date,
    } = req.body

    const [err, loan] = await getPromise(updateLoanExecute({
        id,
        name,
        description,
        date,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(loan)
}

module.exports = updateLoanController