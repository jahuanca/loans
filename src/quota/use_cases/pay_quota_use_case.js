const { payQuotaRepository } = require("../repositories");

const payQuotaUseCaseExecute = ({
    id_of_quota,
    paid_date,
    idUser,
}) => payQuotaRepository({
    id_of_quota,
    paid_date,
    idUser,
})

module.exports = payQuotaUseCaseExecute