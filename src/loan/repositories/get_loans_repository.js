const Loan = require("../db/loan_model");

const getLoansRepository = () => Loan.findAll({
    include: [{all: true}],
    order: [['date', 'DESC']]
})

module.exports = getLoansRepository