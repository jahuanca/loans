const Loan = require("../../loan/db/loan_model");
const Quota = require("../../quota/db/quota_model");
const { sequelize } = require("../../utils/db/connection");

const getCustomersRepository = async ({id_customer}) => {
    const { ganancy } = (await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('Quota.ganancy')), 'ganancy'],
        ],
        where: { id_state_quota: 2 },
        include: [{
            model: Loan, 
            where: {id_customer: id_customer}, 
            required: true,
            attributes: []
        }],
        raw: true,
    }))[0]

    const amount_of_loans = await Loan.count({
        where: {
            id_customer: id_customer,
        }
    })

    const {
        start_date
    } = await Loan.findOne({
        where: {
            id_customer: id_customer,
        },
        order: [
            ['start_date', 'ASC']
        ],
        limit: 1,
    })

    const loansInProgress = await Loan.findAll({
        where: {
            id_customer: id_customer,
            id_state_loan: 1,
        }
    })

    const quotas = await Quota.findAll({
        where: {
            id_state_quota: 1
        },
        include: [{model: Loan, where: { id_customer: id_customer }, required: true}]
    })

    let amountInProgress = 0;
    for (let i = 0; i < quotas.length; i++) {
        const element = quotas[i];
        const { amount } = element
        amountInProgress += amount
    }
 
    return {
        ganancy: ganancy ?? 0,
        amount_of_loans,
        start_date,
        loans_in_progress: loansInProgress.length,
        amount_in_progress: amountInProgress,
    }
}

module.exports = getCustomersRepository