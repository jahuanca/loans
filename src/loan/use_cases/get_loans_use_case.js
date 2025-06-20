const { getLoansRepository } = require("../repositories");

const getLoansUseCaseExecute = (query)=> getLoansRepository(query)

module.exports = getLoansUseCaseExecute