const Renewal = require("../../db/renewal_model")

const createRenewalRepository = async ({
    id_user,
    id_customer,
    id_new_loan,
    id_previous_loan,
    date,
    variation_in_amount,
    id_type_renewal,
    observation,
}) => {

    const loan = await Renewal.findOne({
        where: {
            id_previous_loan, id_new_loan,
        }
    })

    if (loan != null) throw Error('Esta relación ya ha sido creada.')

    const renewal = await Renewal.create({
        id_user,
        id_customer,
        id_new_loan,
        id_previous_loan,
        date,
        variation_in_amount,
        id_type_renewal,
        observation,
    })
    return renewal
}

module.exports = createRenewalRepository