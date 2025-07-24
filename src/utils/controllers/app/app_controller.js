const { getPromise } = require("../../core/helpers")
const decodeTokenExecute = require("../../use_cases/app/decode_token_use_case")

const checkTokenController = async (req, res, next) => {
    const {
        authorization
    } = req.headers

    const [err, payload] = await getPromise(decodeTokenExecute(authorization))
    if (err) return res.status(err.status).json({ message: err.message })
    req.idUser = payload.sub
    next()
}

module.exports = {
    checkTokenController,
}