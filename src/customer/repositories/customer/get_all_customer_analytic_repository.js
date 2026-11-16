const Loan = require("../../../loan/db/loan_model");
const Quota = require("../../../quota/db/quota_model");
const { idLoanStates } = require("../../../utils/core/default_values");
const { sequelize } = require("../../../utils/db/connection");
const Customer = require("../../db/customer_model");

const getAllCustomersAnalyticsRepository = async () => {

    const customers = await Customer.findAll()
    let data = []

    for (let i = 0; i < customers.length; i++) {
        const { id: idCustomer, alias, name, lastName } = customers[i].dataValues;
        const ganancy = await _getGanancy({ idCustomer })

        const amountOfLoans = await Loan.count({
            where: {
                idCustomer: idCustomer,
            }
        })

        const startDate = await _getStartDate({ idCustomer })
        const loansInProgress = await _getLoansInProgress({ idCustomer })
        const amountInProgress = await _getAmountInProgress({ idCustomer })

        data.push({
            name: `${alias ?? ''}: ${name}, ${lastName}`,
            idCustomer,
            ganancy: ganancy ?? 0,
            amountOfLoans,
            startDate,
            loansInProgress: loansInProgress.length,
            amountInProgress: amountInProgress,
        })
    }
    return data

    /*const ganancy = await _getGanancy({ idCustomer })

    const amountOfLoans = await Loan.count({
        where: {
            idCustomer: idCustomer,
        }
    })

    const startDate = await _getStartDate({ idCustomer })
    const loansInProgress = await _getLoansInProgress({ idCustomer })
    const amountInProgress = await _getAmountInProgress({ idCustomer })

    return {
        idCustomer,
        ganancy: ganancy ?? 0,
        amountOfLoans,
        startDate,
        loansInProgress: loansInProgress.length,
        amountInProgress: amountInProgress,
    }*/
}

const _getGanancy = async ({
    idCustomer
}) => {
    const { ganancy } = (await Quota.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('Quota.ganancy')), 'ganancy'],
        ],
        where: { idStateQuota: idLoanStates.COMPLETE },
        include: [{
            model: Loan,
            where: { idCustomer: idCustomer },
            required: true,
            attributes: []
        }],
        raw: true,
    }))[0]
    return ganancy
}

const _getStartDate = async ({
    idCustomer
}) => {
    const {
        startDate,
    } = await Loan.findOne({
        where: {
            idCustomer: idCustomer,
        },
        order: [
            ['startDate', 'ASC']
        ],
        limit: 1,
    })
    return startDate
}

const _getLoansInProgress = async ({
    idCustomer
}) => await Loan.findAll({
    where: {
        idCustomer: idCustomer,
        idStateLoan: idLoanStates.PENDING,
    }
})

const _getAmountInProgress = async ({
    idCustomer
}) => {
    const quotas = await Quota.findAll({
        where: {
            idStateQuota: 1
        },
        include: [{ model: Loan, where: { idCustomer: idCustomer }, required: true }]
    })

    let amountInProgress = 0;
    for (let i = 0; i < quotas.length; i++) {
        const element = quotas[i];
        const { amount } = element
        amountInProgress += amount
    }
    return amountInProgress
}

module.exports = getAllCustomersAnalyticsRepository