const { getLoansRepository } = require("./../../repositories");

const getLoansUseCaseExecute = ({
        idCustomer,
        idStateLoan,
    })=> getLoansRepository({
        idCustomer,
        idStateLoan,
    })

module.exports = getLoansUseCaseExecute