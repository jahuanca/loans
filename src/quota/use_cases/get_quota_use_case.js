const { getQuotaRepository } = require("../repositories");

const getQuotaUseCaseExecute = (id)=> getQuotaRepository(id)

module.exports = getQuotaUseCaseExecute