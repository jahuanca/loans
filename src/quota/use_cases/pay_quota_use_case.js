const { payQuotaRepository } = require("../repositories");

const payQuotaUseCaseExecute = ({
    idOfQuota,
    paidDate,
    idUser,
}) => payQuotaRepository({
    idOfQuota,
    paidDate,
    idUser,
})

module.exports = payQuotaUseCaseExecute