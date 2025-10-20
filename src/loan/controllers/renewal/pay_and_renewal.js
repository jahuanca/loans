const { getPromise } = require("../../../utils/core/helpers")
const payAndRenewalUseCaseExecute = require("../../use_cases/renewal/pay_and_renewal_use_case")

const payAndRenewalController = async (req, res) => {

    const { idUser, value } = req
    value.idUser = idUser
    // return res.status(404).json({ message: 'Datos nulos' })

    const [err, data] = await getPromise(
        payAndRenewalUseCaseExecute(value)
    )
    if (err) return res.status(500).json({ message: err })
    if (data == null) return res.status(404).json({ message: 'Datos nulos' })
    res.status(200).json(data)
}

module.exports = payAndRenewalController