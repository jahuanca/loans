const { getPromise } = require("../../../utils/core/helpers")
const payAndRenewalSpecialUseCaseExecute = require("../../use_cases/renewal/pay_and_renewal_special_use_case")

const payAndRenewalSpecialController = async (req, res) => {

    const { idUser, value } = req
    value.idUser = idUser

    const [err, data] = await getPromise(
        payAndRenewalSpecialUseCaseExecute(value)
    )
    if (err) return res.status(500).json({ message: err })
    if (data == null) return res.status(404).json({ message: 'Datos nulos' })
    res.status(200).json(data)
}

module.exports = payAndRenewalSpecialController