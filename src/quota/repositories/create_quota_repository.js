const Quota = require("../db/quota_model");

const createQuotaRepository = ({
    name,
    description,
    date,
}) => Quota.create({
    name,
    description,
    date,
})

module.exports = createQuotaRepository