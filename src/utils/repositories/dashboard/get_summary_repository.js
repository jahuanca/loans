const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")
const { getFormatDate } = require("../../core/formats")

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

    const firstQuotaPending = await Quota.findAll({
        where: {id_state_quota: 1},
        attributes: ['date_to_pay'],
        limit: 1,
        order: [['date_to_pay','ASC']],
    })

    const defaultDateToPay = {date_to_pay: getFormatDate()}
    const [ first= defaultDateToPay, ...args] = firstQuotaPending
    const { date_to_pay } = first

    return {
        'customers_count': customerCount,
        'loans_count': loanCount,
        'all_amount': amount,
        'all_ganancy':ganancy,
        'date_to_search': date_to_pay,
    }
}


module.exports = getResumeRepository