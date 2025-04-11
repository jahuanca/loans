const { getPromise } = require("../../utils/core/helpers")
const updateUserExecute = require("../use_cases/update_user_use_case")

const updateUserController = async (req, res) => {
    const {
        id,
        name,
        description,
        date,
    } = req.body

    const [err, user] = await getPromise(updateUserExecute({
        id,
        name,
        description,
        date,
    }))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(user)
}

module.exports = updateUserController