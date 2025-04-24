const Quota = require("../db/quota_model");

const getQuotasRepository = (query) => {
    console.log(query);
    return Quota.findAll({
        where: query,
    });
}

module.exports = getQuotasRepository