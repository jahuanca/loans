const Loan = require("../../../loan/db/loan_model");
const Quota = require("../../../quota/db/quota_model");
const { idLoanStates } = require("../../../utils/core/default_values");
const { sequelize } = require("../../../utils/db/connection");

const getCustomerAnalyticsRepository = async ({ idCustomer }) => {
    idCustomer = parseInt(idCustomer)

    const ganancy = await _getGanancy({ idCustomer })

    const loans = await Loan.findAll({
        where: {
            idCustomer: idCustomer,
        }
    })

    const amountOfLoans = loans.length

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
        loans: loans,
    }
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

module.exports = getCustomerAnalyticsRepository