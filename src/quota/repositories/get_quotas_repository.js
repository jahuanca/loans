const Quota = require("../db/quota_model");

const getQuotasRepository = (query) => Quota.findAll({ 
    where: query, 
    order: [
        ['name', 'ASC']
    ] 
})

module.exports = getQuotasRepository