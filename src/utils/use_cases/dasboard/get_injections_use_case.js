const { getInjectionsRepository } = require("../../repositories/dashboard")

const getInjectionsUseCase = () => getInjectionsRepository()

module.exports = getInjectionsUseCase