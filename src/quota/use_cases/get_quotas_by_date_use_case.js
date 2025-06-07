const { getQuotasByDateRepository } = require("../repositories");

const getQuotasUseCaseExecute = (query)=> getQuotasByDateRepository(query)

module.exports = getQuotasUseCaseExecute