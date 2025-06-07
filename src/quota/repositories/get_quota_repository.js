const Quota = require("../db/quota_model");

const getQuotaRepository = (id) => Quota.findByPk(id)

module.exports = getQuotaRepository