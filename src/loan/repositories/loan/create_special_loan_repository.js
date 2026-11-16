const Quota = require("./../../../quota/db/quota_model");
const { operationsOfLog } = require("./../../../utils/core/default_values");
const { addDays } = require("./../../../utils/core/helpers");
const { sequelize } = require("./../../../utils/db/connection");
const Loan = require("./../../db/loan_model");

const createSpecialLoanRepository = async ({
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
    numberOfInstallments,
    daysBetweenInstallments,
}) => {
    try {
        const result = await sequelize.transaction(async t => {
            const loan = await Loan.create({
                idCustomer,
                idUser,
                idPaymentFrequency,
                idPaymentMethod,
                percentage,
                amount,
                startDate,
                ganancy,
                observation,
                idStateLoan: 1,
                evidence: 'ruta desconocida',
                descriptionOperation: operationsOfLog.CREATE_SPECIAL_LOAN,
                idUser: idUser,

                numberOfInstallments: numberOfInstallments,
                daysBetweenInstallments: daysBetweenInstallments,
            }, { transaction: t })

            const allAmount = amount * (percentage / 100 + 1)

            await createQuotas({
                numberOfInstallments,
                daysBetweenInstallments,
                idLoan: loan.id,
                startDate,
                allAmount,
                amount,
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

            return loan
        });
        
        return result
    } catch (error) {
        console.log(error)
    }
}

const createQuotas = async ({
    numberOfInstallments,
    daysBetweenInstallments,
    idLoan,
    startDate,
    allAmount,
    amount,
    t,
}) => {
    for (let i = 0; i < numberOfInstallments; i++) {
        const isLast = i == (numberOfInstallments - 1)
        await Quota.create({
            name: `${(i + 1)}/${numberOfInstallments}`,
            description: '',
            idLoan,
            ganancy: (allAmount - amount) / numberOfInstallments,
            amount: allAmount / numberOfInstallments,
            dateToPay: addDays(startDate, daysBetweenInstallments * (i + 1)),
            idStateQuota: 1,
            isLast: isLast,
        }, { transaction: t })
    }
}

module.exports = createSpecialLoanRepository