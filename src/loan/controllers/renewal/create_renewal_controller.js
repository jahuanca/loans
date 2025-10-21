const { getPromise } = require("../../../utils/core/helpers")
const createRenewalUseCaseExecute = require("../../use_cases/renewal/create_renewal_use_case")

const createRenewalController = async (req, res) => {

    const {
        id_customer,
        id_new_loan,
        id_previous_loan,
        date,
        variation_in_amount,
        id_type_renewal,
        observation,
    } = req.body

    const [err, renewal] = await getPromise(
        createRenewalUseCaseExecute({
            id_customer,
            id_new_loan,
            id_previous_loan,
            date,
            variation_in_amount,
            id_type_renewal,
            observation,
        })
    )
    if (err) return res.status(500).json({message: err})
    if (renewal == null) return res.status(404).json({message: 'Renewal nulo.'})
    res.status(200).json(renewal)
}

module.exports = createRenewalController