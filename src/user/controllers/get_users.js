const { getPromise } = require("../../utils/core/helpers")
const getUsersUseCaseExecute = require("../use_cases/get_users_use_case")

const getUsersController = async (req, res, next)=> {
    const [err, users] = await getPromise(getUsersUseCaseExecute())
    if (err) {
        return next(err)
    }
    return res.status(200).json(users)
}

module.exports = getUsersController