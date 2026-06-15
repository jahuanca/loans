const { createLoan, createRenewal } = require("../utils");
const { sequelize } = require("./../../../utils/db/connection");

const createLoanRepository = async ({
    id_customer,
    id_loan_to_renew,
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
            const loan = await createLoan({
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

            
            if (id_loan_to_renew) {
                await createRenewal({
                    loan,
                    id_loan_to_renew,
                    amount,
                    id_customer,
                    idUser: id_user,
                    t,
                })
            } else {
                // preguntar si es que viene vacio.
                // consultar si no existen prestamos anteriores, en caso de que no 
                // crear una renovacion con valor previous null y new el creado
            }

            return loan
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = createLoanRepository