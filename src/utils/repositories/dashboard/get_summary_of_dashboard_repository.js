const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")
const { idLoanStates, idQuotaStates } = require("../../core/default_values")
const { Sequelize } = require("sequelize")

const getSummaryOfDashboardRepository = async () => {

    const loansInfo = await getLoansInfo()
    const amountsInfo = await getAmountsInfo()
    const ganancyInfo = await getGanancyInfo()
    const renovar = await getRenovar()

    return {
        'amounts': amountsInfo,
        'ganancy': ganancyInfo,
        'loans': loansInfo,
        'renovar': renovar,
    }
}

const getLoansInfo = async () => {
    const pendings = await Loan.count({ where: { id_state_loan: idLoanStates.PENDING } })

    return (pendings).toString()
}

const getRenovar = async () => {
    const pendings = await Loan.findAll(
        {
            attributes: {

                include: [
                    [
                        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "Quota" AS q
          WHERE q."id_loan" = "Loan"."id" AND q."id_state_quota" = ${idQuotaStates.PENDING}
        )`),
                        'quotaCount'
                    ]
                ]
            },
            where: {id_state_loan: idLoanStates.PENDING}
        }
    )
    
    let count = 0
    pendings.forEach(e => {
        const { dataValues } = e
        const { quotaCount } = dataValues
        if (quotaCount == idQuotaStates.PENDING) count++
    });

    return (count).toString()
}

const getAmountsInfo = async () => {
    const { amountPending } = (await Quota.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.literal('COALESCE(amount, 0) - COALESCE(ganancy, 0)')), 'amountPending'],
        ],
        where: { id_state_quota: 1 },
        raw: true,
    }))[0]

    return (amountPending ?? 0).toFixed(2)

}

const getGanancyInfo = async () => {
    const { ganacyPending } = (await Quota.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('ganancy')), 'ganacyPending'],
        ],
        where: { id_state_quota: 1 },
        raw: true,
    }))[0]

    return (ganacyPending ?? 0).toFixed(2)

}

module.exports = getSummaryOfDashboardRepository