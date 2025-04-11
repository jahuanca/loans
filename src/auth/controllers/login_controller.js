const { getPromise } = require("../../utils/core/helpers")
const loginUseCaseExecute = require("../use_cases/login_use_case")

const loginController = async (req, res) => {
    const {
        email,
        password,
    } = req.body
    const [err, user] = await getPromise(
        loginUseCaseExecute({
            email,
            password,
        })
    )
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(user)
}

module.exports = loginController