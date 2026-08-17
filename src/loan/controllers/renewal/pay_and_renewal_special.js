const { getPromise } = require("../../../utils/core/helpers")
const payAndRenewalSpecialUseCaseExecute = require("../../use_cases/renewal/pay_and_renewal_special_use_case")

const payAndRenewalSpecialController = async (req, res, next) => {

    const { idUser, value } = req
    value.idUser = idUser

    const [err, data] = await getPromise(
        payAndRenewalSpecialUseCaseExecute(value)
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(data)
}

module.exports = payAndRenewalSpecialController