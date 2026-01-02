const Loan = require("../../../loan/db/loan_model");
const Quota = require("../../../quota/db/quota_model");
const { idLoanStates } = require("../../../utils/core/default_values");
const { sequelize } = require("../../../utils/db/connection");
const Customer = require("../../db/customer_model");

const getAllCustomersAnalyticsRepository = async () => {

    const customers = await Customer.findAll()
    let data = []

    for (let i = 0; i < customers.length; i++) {
        const { id: id_customer, alias, name, lastName } = customers[i].dataValues;
        const ganancy = await _getGanancy({ id_customer })

        const amount_of_loans = await Loan.count({
            where: {
                id_customer: id_customer,
            }
        })

        const start_date = await _getStartDate({ id_customer })
        const loansInProgress = await _getLoansInProgress({ id_customer })
        const amountInProgress = await _getAmountInProgress({ id_customer })

        data.push({
            name: `${alias ?? ''}: ${name}, ${lastName}`,
            id_customer,
            ganancy: ganancy ?? 0,
            amount_of_loans,
            start_date,
            loans_in_progress: loansInProgress.length,
            amount_in_progress: amountInProgress,
        })
    }
    return data

    /*const ganancy = await _getGanancy({ id_customer })

    const amount_of_loans = await Loan.count({
        where: {
            id_customer: id_customer,
        }
    })

    const start_date = await _getStartDate({ id_customer })
    const loansInProgress = await _getLoansInProgress({ id_customer })
    const amountInProgress = await _getAmountInProgress({ id_customer })

    return {
        id_customer,
        ganancy: ganancy ?? 0,
        amount_of_loans,
        start_date,
        loans_in_progress: loansInProgress.length,
        amount_in_progress: amountInProgress,
    }*/
}

const _getGanancy = async ({
    id_customer
}) => {
    const { ganancy } = (await Quota.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('Quota.ganancy')), 'ganancy'],
        ],
        where: { id_state_quota: idLoanStates.COMPLETE },
        include: [{
            model: Loan,
            where: { id_customer: id_customer },
            required: true,
            attributes: []
        }],
        raw: true,
    }))[0]
    return ganancy
}

const _getStartDate = async ({
    id_customer
}) => {
    const {
        start_date,
    } = await Loan.findOne({
        where: {
            id_customer: id_customer,
        },
        order: [
            ['start_date', 'ASC']
        ],
        limit: 1,
    })
    return start_date
}

const _getLoansInProgress = async ({
    id_customer
}) => await Loan.findAll({
    where: {
        id_customer: id_customer,
        id_state_loan: idLoanStates.PENDING,
    }
})

const _getAmountInProgress = async ({
    id_customer
}) => {
    const quotas = await Quota.findAll({
        where: {
            id_state_quota: 1
        },
        include: [{ model: Loan, where: { id_customer: id_customer }, required: true }]
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