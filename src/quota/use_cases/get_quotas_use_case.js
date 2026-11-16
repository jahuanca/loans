const { getQuotasRepository } = require("../repositories");

const getQuotasUseCaseExecute = ({
    idLoan,
}) => getQuotasRepository({
    idLoan,
})

module.exports = getQuotasUseCaseExecute