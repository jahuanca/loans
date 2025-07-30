const { getPromise } = require("../../utils/core/helpers")
const createTokenExecute = require("../../utils/use_cases/app/create_token_use_case")
const loginUseCaseExecute = require("../use_cases/login_use_case")

const loginController = async (req, res) => {
    const { email, password } = req.body
    const [err, user] = await getPromise(
        loginUseCaseExecute({ email, password })
    )
    if (err) return res.status(500).json({ message: err.message })
    if (user == null) return res.status(404).json({ message: 'Valide los datos de entrada' })

    const token = createTokenExecute(user)
    if (token == null) return res.status(404).json({ message: 'No se pudo crear el token' })
    user.dataValues.token = token
    return res.status(200).json(user)
}

module.exports = loginController