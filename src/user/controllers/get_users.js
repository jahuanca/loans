const { getPromise } = require("../../utils/core/helpers")
const getUsersUseCaseExecute = require("../use_cases/get_users_use_case")

const getUsersController = async (req, res)=> {
    const [err, users] = await getPromise(getUsersUseCaseExecute())
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(users)
}

module.exports = getUsersController