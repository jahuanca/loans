const { getQuotasByDateRepository } = require("./../../repositories/dashboard");

const getQuotasUseCaseExecute = (query)=> getQuotasByDateRepository(query)

module.exports = getQuotasUseCaseExecute