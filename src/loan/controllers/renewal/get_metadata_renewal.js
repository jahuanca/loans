const { getPromise } = require("../../../utils/core/helpers")
const getMetadataByCreateUseCaseExecute = require("../../use_cases/renewal/get_metadata_by_create_use_case")

const getMetadataRenewalController = async (req, res) => {

    const { id_customer } = req.query

    const [err, renewals] = await getPromise(
        getMetadataByCreateUseCaseExecute({
            id_customer
        })
    )
    if (err) return res.status(500).json({message: err})
    if (renewals == null) return res.status(404).json({message: 'Renewals nulos.'})
    res.status(200).json(renewals)
}

module.exports = getMetadataRenewalController