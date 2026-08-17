const Customer = require("../../../customer/db/customer_model")
const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const Quota = require("../../../quota/db/quota_model")
const { idLoanStates, idQuotaStates } = require("../../core/default_values")
const { Sequelize, Op } = require("sequelize")
const { col, fn } = sequelize
const Renewal = require("../../../loan/db/renewal_model")
const { initialDayOfMonth, finalDayOfMonth } = require("../../core/helpers")

const getSummaryOfDashboardRepository = async () => {

    const loansInfo = await getLoansInfo()
    const amountsInfo = await getAmountsInfo()
    const ganancyInfo = await getGanancyInfo()
    const renovar = await getRenovar()
    const injection = await currentInjection()
    const cesaron = await countCesaron()

    return {
        'amounts': amountsInfo,
        'ganancy': ganancyInfo,
        'loans': loansInfo,
        'renovar': renovar,
        'injection': injection,
        'cesaron': cesaron,
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
            where: { id_state_loan: idLoanStates.PENDING }
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
            [fn('SUM', sequelize.literal('COALESCE(amount, 0) - COALESCE(ganancy, 0)')), 'amountPending'],
        ],
        where: { id_state_quota: 1 },
        raw: true,
    }))[0]

    return (amountPending ?? 0).toFixed(2)

}

const getGanancyInfo = async () => {
    const { ganacyPending } = (await Quota.findAll({
        attributes: [
            [fn('SUM', col('ganancy')), 'ganacyPending'],
        ],
        where: { id_state_quota: 1 },
        raw: true,
    }))[0]

    return (ganacyPending ?? 0).toFixed(2)

}

const currentInjection = async () => {
    const data = await Renewal.findAll({
        attributes: [
            [fn('SUM', col('variation_in_amount')), 'inversion'],
            [fn('DATE_TRUNC', 'month', col('date')), 'periodo'],
        ],
        group: [
            fn('DATE_TRUNC', 'month', col('date')),
        ],
        order: [
            [fn('DATE_TRUNC', 'month', col('date')), 'DESC']
        ],
        where: {
            date: {
                [Op.between]: [initialDayOfMonth(), finalDayOfMonth()],
            }
        }
    })

    if (data.length == 0) { return 0 }
    const { dataValues } = data[0]
    const { inversion } = dataValues
    return inversion
}

const countCesaron = async () => {
    return await Customer.count({
        include: [
            {
                model: Loan,
                attributes: [],
                where: {
                    id_state_loan: 1
                },
                required: false
            }
        ],
        where: {
            '$Loans.id$': null
        },
        order: [
            [col("id"), "DESC"]
        ]
    })
}

/*
const getInjections = async () => {
    const data = await Renewal.findAll({
        attributes: [
            [ fn('SUM', col('variation_in_amount')), 'inversion' ],
            [ fn('DATE_TRUNC', 'month', col('date')), 'periodo' ],
        ],
        group: [
            fn('DATE_TRUNC', 'month', col('date')),
        ],
        order: [
            [ fn('DATE_TRUNC', 'month', col('date')), 'DESC']
        ]
    })
    return data
}
*/
module.exports = getSummaryOfDashboardRepository