const { getQuotasByDateRepository } = require("./../../repositories/dashboard");

const getQuotasUseCaseExecute = ({
    idStateQuota,
    fromDate,
    untilDate,
})=> getQuotasByDateRepository({
    idStateQuota,
    fromDate,
    untilDate,
})

module.exports = getQuotasUseCaseExecute