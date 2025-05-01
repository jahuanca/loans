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
    console.log(user)
    if(user == null) return res.status(404).json({ message: 'Valide los datos de entrada' })
    return res.status(200).json(user)
}

module.exports = loginController