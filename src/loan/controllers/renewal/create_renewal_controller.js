const { getPromise } = require("../../../utils/core/helpers")
const createRenewalUseCaseExecute = require("../../use_cases/renewal/create_renewal_use_case")

const createRenewalController = async (req, res, next) => {

    const {value, idUser} = req
    value.id_user = idUser

    const [err, renewal] = await getPromise(
        createRenewalUseCaseExecute(value)
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(renewal)
}

module.exports = createRenewalController