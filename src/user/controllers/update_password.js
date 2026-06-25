const { getPromise } = require("../../utils/core/helpers")
const updatePasswordUseCase = require("../use_cases/update_password_use_case")

const updatePasswordController = async (req, res) => {
    const {
        currentPassword,
        newPassword,
    } = req.body

    const [err, user] = await getPromise(updatePasswordUseCase({
        id: req.idUser,
        currentPassword,
        newPassword,
    }))
    if (err) return res.status(500).json({ message: err.message })
    return res.status(200).json(user)
}

module.exports = updatePasswordController