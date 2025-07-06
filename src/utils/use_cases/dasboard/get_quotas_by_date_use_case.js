const { getQuotasByDateRepository } = require("./../../repositories/dashboard");

const getQuotasUseCaseExecute = ({
    id_state_quota,
    from_date,
    until_date,
})=> getQuotasByDateRepository({
    id_state_quota,
    from_date,
    until_date,
})

module.exports = getQuotasUseCaseExecute