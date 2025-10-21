const Renewal = require("../../db/renewal_model")

const createRenewalRepository = async ({

}) => {
    const renewal = await Renewal.create({

    })
    return renewal
}

module.exports = createRenewalRepository