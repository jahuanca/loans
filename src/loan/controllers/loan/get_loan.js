const { getPromise } = require("../../../utils/core/helpers")
const {
    getLoanUseCaseExecute
} = require("../../use_cases")

const getLoanController = async (req, res)=> {
    const {
        id,
    } = req.params
    const [err, loan] = await getPromise(getLoanUseCaseExecute({id}))
    if (err) return res.status(500).json({message: err.message})
    res.status(200).json(loan)
}

module.exports = getLoanController