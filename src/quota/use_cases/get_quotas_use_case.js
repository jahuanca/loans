const { getQuotasRepository } = require("../repositories");

const getQuotasUseCaseExecute = ({
    id_loan,
}) => getQuotasRepository({
    id_loan,
})

module.exports = getQuotasUseCaseExecute