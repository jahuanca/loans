const { typeRenewal } = require("../../../utils/core/default_values");
const Loan = require("../../db/loan_model");
const Renewal = require("../../db/renewal_model");
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
                const count = await Loan.count({
                    where: {
                        id_customer: id_customer
                    }
                }, { transaction: t })
                if (count == 0) {
                    const { dataValues } = loan
                    await Renewal.create({
                        id_customer,
                        id_user: id_user,
                        id_previous_loan: null,
                        id_new_loan: dataValues.id,
                        variation_in_amount: amount,
                        id_type_renewal: typeRenewal.INCREASE,
                    }, { transaction: t })
                }
            }

            return loan
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = createLoanRepository