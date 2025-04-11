const { getPromise } = require("../../utils/core/helpers")
const deleteLoanExecute = require("../use_cases/delete_loan_use_case")

const deleteLoanController = async (req, res) => {
    const {id} = req.params
    const [err, loan] = await getPromise(deleteLoanExecute({id}))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(loan)
}

module.exports = deleteLoanController