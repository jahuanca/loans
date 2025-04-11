const { getUsersRepository } = require("../repositories");

const getUsersUseCaseExecute = ()=> getUsersRepository()

module.exports = getUsersUseCaseExecute