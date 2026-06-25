const { fn, col } = require("sequelize")
const Renewal = require("../../../loan/db/renewal_model")
const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { idLoanStates } = require("../../core/default_values")

const getCustomersWithoutLoanRepository = async () => {
    return await Customer.findAll({
        include: [
            {
                model: Loan,
                attributes: [],
                where: {
                    id_state_loan: 1
                },
                required: false
            }
        ],
        where: {
            '$Loans.id$': null
        },
        order: [
            [col("id"), "DESC"]
        ]
    })
}

module.exports = getCustomersWithoutLoanRepository