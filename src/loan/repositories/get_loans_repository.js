const Loan = require("../db/loan_model");

const getLoansRepository = (query) => {
    const { id_state_loan } = query
    let where = {}
    if (id_state_loan != null) {
        where.id_state_loan = id_state_loan
    }
    return Loan.findAll({
        include: [{ all: true }],
        order: [['start_date', 'DESC']],
        where: where,
    })
}

module.exports = getLoansRepository