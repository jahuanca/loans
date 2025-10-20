const { createLoan } = require("../utils");
const { sequelize } = require("./../../../utils/db/connection");

const createLoanRepository = async ({
    id_customer,
    id_user,
    id_payment_frequency,
    id_payment_method,
    amount,
    percentage,
    start_date,
    ganancy,
    observation,
    id_state_loan,
    evidence,
}) => {
    try {
        const result = await sequelize.transaction(async t => {
            return await createLoan({
                id_customer,
                id_user,
                id_payment_frequency,
                id_payment_method,
                amount,
                percentage,
                start_date,
                ganancy,
                observation,
                id_state_loan,
                evidence,
                t,
            })
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = createLoanRepository