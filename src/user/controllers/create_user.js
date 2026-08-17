const { getPromise } = require("./../../utils/core/helpers")
const createUserUseCaseExecute = require("../use_cases/create_user_use_case")

const createUserController = async (req, res, next) => {
    const {
        name,
        password,
        lastName,
        email,
        phoneNumber,
    } = req.body
    const [err, user] = await getPromise(createUserUseCaseExecute({
        name,
        password,
        lastName,
        email,
        phoneNumber,
    }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(user)
}

module.exports = createUserController