const { Op } = require("sequelize");
const Loan = require("../db/loan_model");
const { addDays } = require("../../utils/core/helpers");

const validateLoanRepository = async ({
    id_customer,
    id_payment_frequency,
    amount,
    percentage,
    start_date,
}) => {
    const initDate = addDays(start_date, - 2)
    const lastDate = addDays(start_date, + 2)

    const initAmount = (amount - 100)
    const lastAmount = Number(amount) + 100
    
    const result = await Loan.count({
        where: {
            id_customer,
            amount: {
                [Op.between]: [initAmount, lastAmount]
            },
            start_date: {
                [Op.between] : [initDate, lastDate],
            },
        }
    })
    return (result == 0)
}

module.exports = validateLoanRepository