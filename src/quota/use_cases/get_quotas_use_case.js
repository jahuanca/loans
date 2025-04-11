const { getQuotasRepository } = require("../repositories");

const getQuotasUseCaseExecute = ()=> getQuotasRepository()

module.exports = getQuotasUseCaseExecute