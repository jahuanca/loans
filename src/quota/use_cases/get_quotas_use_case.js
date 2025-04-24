const { getQuotasRepository } = require("../repositories");

const getQuotasUseCaseExecute = (query)=> getQuotasRepository(query)

module.exports = getQuotasUseCaseExecute