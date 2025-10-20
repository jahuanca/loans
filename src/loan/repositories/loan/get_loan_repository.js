const Loan = require("../../db/loan_model");

const getLoanRepository = ({id}) => {
    let where = {}
    if (id != null) where.id = id
    return Loan.findOne({
        include: [{ all: true }],
        order: [['start_date', 'DESC']],
        where: where,
    })
}

module.exports = getLoanRepository