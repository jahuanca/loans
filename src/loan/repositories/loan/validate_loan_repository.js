const { Op } = require("sequelize");
const Loan = require("./../../db/loan_model");
const { addDays } = require("../../../utils/core/helpers");

const validateLoanRepository = async ({
    idCustomer,
    idPaymentFrequency,
    amount,
    percentage,
    startDate,
}) => {
    const initDate = addDays(startDate, - 2)
    const lastDate = addDays(startDate, + 2)

    const initAmount = (amount - 100)
    const lastAmount = Number(amount) + 100
    
    const result = await Loan.count({
        where: {
            idCustomer,
            amount: {
                [Op.between]: [initAmount, lastAmount]
            },
            startDate: {
                [Op.between] : [initDate, lastDate],
            },
        }
    })
    return (result == 0)
}

module.exports = validateLoanRepository