const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")

const getResumeRepository = async ()=> {

    const customerCount = await Customer.count()
    const loanCount = await Loan.count()
    const {
        amount
    } = (await Loan.findAll(
        {
            attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'amount']],
            raw: true,
        }
    ))[0]

    const {
        ganancy
    } = (await Loan.findAll(
        {
            attributes: [[sequelize.fn('SUM', sequelize.col('ganancy')), 'ganancy']],
            raw: true,
        }
    ))[0]

    return {
        'customers_count': customerCount,
        'loans_count': loanCount,
        'all_amount': amount,
        'all_ganancy':ganancy,
    }
}


module.exports = getResumeRepository