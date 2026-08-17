const { getPromise } = require("../../../utils/core/helpers")
const payAndRenewalUseCaseExecute = require("../../use_cases/renewal/pay_and_renewal_use_case")

const payAndRenewalController = async (req, res, next) => {

    const { idUser, value } = req
    value.idUser = idUser

    const [err, data] = await getPromise(
        payAndRenewalUseCaseExecute(value)
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(data)
}

module.exports = payAndRenewalController