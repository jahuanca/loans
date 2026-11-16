const { typeRenewal, typeMovements } = require("../../../utils/core/default_values");
const { models } = require("../../../utils/db");
const { CapitalMovements } = models
const Loan = require("../../db/loan_model");
const Renewal = require("../../db/renewal_model");
const { createLoan, createRenewal } = require("../utils");
const { sequelize } = require("./../../../utils/db/connection");

const createLoanRepository = async ({
    idCustomer,
    idLoanToRenew,
    idUser,
    idPaymentFrequency,
    idPaymentMethod,
    amount,
    percentage,
    startDate,
    ganancy,
    observation,
    idStateLoan,
    evidence,
}) => {
    try {
        const result = await sequelize.transaction(async t => {
            const loan = await createLoan({
                idCustomer,
                idUser,
                idPaymentFrequency,
                idPaymentMethod,
                amount,
                percentage,
                startDate,
                ganancy,
                observation,
                idStateLoan,
                evidence,
                t,
            })

            const { dataValues } = loan
            const { idLoan } = dataValues

            await CapitalMovements.create({
                type: typeMovements.OUT,
                description: `SALIDA de capital ${amount}, para préstamo P#${idLoan}.`,
                amount: -amount,
                ganancy: 0,
                idLoan: idLoan,
                idUser: idUser,
            }, {
                transaction: t,
            })


            if (idLoanToRenew) {
                await createRenewal({
                    loan,
                    idLoanToRenew,
                    amount,
                    idCustomer,
                    idUser: idUser,
                    t,
                })
            } else {
                const count = await Loan.count({
                    where: {
                        idCustomer: idCustomer
                    }
                }, { transaction: t })
                if (count == 0) {
                    const { dataValues } = loan
                    await Renewal.create({
                        idCustomer,
                        idUser: idUser,
                        idPreviousLoan: null,
                        idNewLoan: dataValues.id,
                        variationInAmount: amount,
                        idTypeRenewal: typeRenewal.INCREASE,
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