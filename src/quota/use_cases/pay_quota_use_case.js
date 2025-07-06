const { payQuotaRepository } = require("../repositories");

const payQuotaUseCaseExecute = ({
    id_of_quota,
    paid_date,
}) => payQuotaRepository({
    id_of_quota,
    paid_date,
})

module.exports = payQuotaUseCaseExecute