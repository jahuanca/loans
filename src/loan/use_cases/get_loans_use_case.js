const { getLoansRepository } = require("../repositories");

const getLoansUseCaseExecute = ()=> getLoansRepository()

module.exports = getLoansUseCaseExecute