const Loan = require("../db/loan_model");

const getLoansRepository = ({
        id_customer,
        id_state_loan,
    }) => {
    let where = {}
    if (id_state_loan != null) where.id_state_loan = id_state_loan
    if (id_customer != null) where.id_customer = id_customer
    return Loan.findAll({
        include: [{ all: true }],
        order: [['start_date', 'DESC']],
        where: where,
    })
}

module.exports = getLoansRepository