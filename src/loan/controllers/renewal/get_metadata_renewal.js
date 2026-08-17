const { getPromise } = require("../../../utils/core/helpers")
const getMetadataByCreateUseCaseExecute = require("../../use_cases/renewal/get_metadata_by_create_use_case")

const getMetadataRenewalController = async (req, res, next) => {

    const { id_customer } = req.query

    const [err, renewals] = await getPromise(
        getMetadataByCreateUseCaseExecute({
            id_customer
        })
    )
    if (err) {
        return next(err)
    }
    return res.status(200).json(renewals)
}

module.exports = getMetadataRenewalController