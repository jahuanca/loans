const { payQuotaRepository } = require("../repositories");

const payQuotaUseCaseExecute = ({
    id,
    date,
}) => payQuotaRepository({
    id,
    date,
})

module.exports = payQuotaUseCaseExecute