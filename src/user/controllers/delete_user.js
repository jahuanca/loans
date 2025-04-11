const { getPromise } = require("../../utils/core/helpers")
const deleteUserExecute = require("../use_cases/delete_user_use_case")

const deleteUserController = async (req, res) => {
    const {id} = req.params
    const [err, user] = await getPromise(deleteUserExecute({id}))
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(user)
}

module.exports = deleteUserController