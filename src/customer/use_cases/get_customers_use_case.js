const { getCustomersRepository } = require("../repositories");

const getCustomersUseCaseExecute = ()=> getCustomersRepository()

module.exports = getCustomersUseCaseExecute