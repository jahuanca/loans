const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")
const { getFormatDate } = require("../../core/formats")

const getResumeRepository = async () => {

    const customerCount = await Customer.count()
    const loansInfo = await getLoansInfo()
    const amountsInfo = await getAmountsInfo()
    const ganancyInfo = await getGanancyInfo()

    const firstQuotaPending = await Quota.findAll({
        where: { id_state_quota: 1 },
        attributes: ['date_to_pay'],
        limit: 1,
        order: [['date_to_pay', 'ASC']],
    })

    const defaultDateToPay = { date_to_pay: getFormatDate() }
    const [first = defaultDateToPay, ...args] = firstQuotaPending
    const { date_to_pay } = first

    return {
        'customers_count': customerCount,
        'amounts_info': amountsInfo,
        'ganancy_info': ganancyInfo,
        'date_to_search': date_to_pay,  
        'loans_info': loansInfo,
    }
}

const getLoansInfo = async () => {
    const pendings = await Loan.count({ where: { id_state_loan: 1} })
    const completes = await Loan.count({ where: { id_state_loan: 2 } })
    
    return {
        'todas': pendings + completes,
        'completas': completes,
        'pendientes': pendings,
    }
}

const getAmountsInfo = async () => {
    const { amountPending } = (await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('amount')), 'amountPending'],
        ],
        where: {id_state_quota: 1},
        raw: true,
    }))[0]

    const { amountComplete } = (await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('amount')), 'amountComplete'],
        ],
        where: {id_state_quota: 2},
        raw: true,
    }))[0]

    return {
        'tod.': (amountComplete + amountPending).toFixed(2),
        'compl.': (amountComplete ?? 0).toFixed(2),
        'pend.': (amountPending ?? 0).toFixed(2),
    }
}

const getGanancyInfo = async () => {
    const { ganacyPending } = (await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('ganancy')), 'ganacyPending'],
        ],
        where: {id_state_quota: 1},
        raw: true,
    }))[0]

    const { ganancyComplete } = (await Quota.findAll({
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('ganancy')), 'ganancyComplete'],
        ],
        where: {id_state_quota: 2},
        raw: true,
    }))[0]

    return {
        'todo': (ganacyPending + ganancyComplete).toFixed(2),
        'cobrado': (ganancyComplete).toFixed(2),
        'pendiente': (ganacyPending ?? 0).toFixed(2),
    }
}


module.exports = getResumeRepository