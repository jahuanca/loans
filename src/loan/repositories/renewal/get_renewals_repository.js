const Renewal = require("../../db/renewal_model")

const getRenewalsRepository = () => Renewal.findAll()

module.exports = getRenewalsRepository