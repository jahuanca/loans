const { getPromise } = require("./../../utils/core/helpers")
const createUserUseCaseExecute = require("../use_cases/create_user_use_case")

const createUserController = async (req, res) => {
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
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(user)
}

module.exports = createUserController