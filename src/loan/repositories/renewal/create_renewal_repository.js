const Renewal = require("../../db/renewal_model")

const createRenewalRepository = async ({
    idUser,
    idCustomer,
    idNewLoan,
    idPreviousLoan,
    date,
    variationInAmount,
    idTypeRenewal,
    observation,
}) => {

    const loan = await Renewal.findOne({
        where: {
            idPreviousLoan, idNewLoan,
        }
    })

    if (loan != null) throw Error('Esta relación ya ha sido creada.')

    const renewal = await Renewal.create({
        idUser,
        idCustomer,
        idNewLoan,
        idPreviousLoan,
        date,
        variationInAmount,
        idTypeRenewal,
        observation,
    })
    return renewal
}

module.exports = createRenewalRepository