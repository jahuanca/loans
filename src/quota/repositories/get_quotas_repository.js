const Quota = require("../db/quota_model");

const getQuotasRepository = () => Quota.findAll()

module.exports = getQuotasRepository