const { getLoansRepository } = require("./../../repositories");

const getLoansUseCaseExecute = ({
        id_customer,
        id_state_loan,
    })=> getLoansRepository({
        id_customer,
        id_state_loan,
    })

module.exports = getLoansUseCaseExecute