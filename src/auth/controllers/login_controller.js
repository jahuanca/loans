const { enIE } = require("date-fns/locale")
const { ErrorServer } = require("../../utils/core/error/errors")
const { getPromise } = require("../../utils/core/helpers")
const createTokenExecute = require("../../utils/use_cases/app/create_token_use_case")
const loginUseCaseExecute = require("../use_cases/login_use_case")
const ErrorApi = require("../../utils/core/error/error_api")

const loginController = async (req, res, next) => {
    const { email, password } = req.body
    const [err, user] = await getPromise(
        loginUseCaseExecute({ email, password })
    )
    if (err) {
        return next(err)
    }

    const token = createTokenExecute(user)
    if (token == null) {
        return next(ErrorServer(404, 'No se pudo crear el token.'))
    }
    user.dataValues.token = token
    return res.status(200).json(user)
}

module.exports = loginController