const { getRenewalsRepository } = require("../../repositories")

const getRenewalsUseCaseExecute = () => getRenewalsRepository()

module.exports = getRenewalsUseCaseExecute