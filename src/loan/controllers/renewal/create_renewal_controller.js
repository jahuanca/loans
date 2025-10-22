const { getPromise } = require("../../../utils/core/helpers")
const createRenewalUseCaseExecute = require("../../use_cases/renewal/create_renewal_use_case")

const createRenewalController = async (req, res) => {

    const {value, idUser} = req
    value.id_user = idUser

    const [err, renewal] = await getPromise(
        createRenewalUseCaseExecute(value)
    )
    if (err) return res.status(500).json({message: err.toString()})
    if (renewal == null) return res.status(404).json({message: 'Renewal nulo.'})
    res.status(200).json(renewal)
}

module.exports = createRenewalController