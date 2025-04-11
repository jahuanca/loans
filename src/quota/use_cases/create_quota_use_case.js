const { createQuotaRepository } = require("../repositories");

const createQuotaUseCaseExecute = ({
    name,
    description,
    date,
})=> createQuotaRepository({
    name,
    description,
    date,
})

module.exports = createQuotaUseCaseExecute