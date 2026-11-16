const { Op, Sequelize } = require("sequelize")
const Loan = require("../../../loan/db/loan_model")
const { idQuotaStates, idLoanStates } = require("../../core/default_values")
const Quota = require("../../../quota/db/quota_model")
const { initialOfDay, addDays, startOfTheWeek, finalOfDay } = require("../../core/helpers")
const Customer = require("../../../customer/db/customer_model")

const getNextRenewalRepository = async () => {
    const ids = await getIds()

    const quotas = await Quota.findAll({
        raw: true,
        attributes: [
            'id',
            'name',
            'isLast',
            [Sequelize.col('Loan.id_payment_frequency'), 'idPaymentFrequency'],
            [
                Sequelize.literal(
                    'CASE WHEN id_payment_frequency = 5 THEN true ELSE false END'
                ),
                'isSpecial'
            ],
            [
                Sequelize.fn('CONCAT',
                    Sequelize.col('Loan.Customer.name'),
                    ' ',
                    Sequelize.col('Loan.Customer.last_name')
                ),
                'customerName'
            ],
            'Loan.Customer.alias',
            [Sequelize.col('Loan.Customer.id'), 'idCustomer'],
            [Sequelize.col('Loan.amount'), 'amountOfLoan'],
            'idLoan',
            'amount',
            'ganancy',
            'idStateQuota',
            'dateToPay',
            'paidDate',
        ],
        where: {
            isLast: true,
            idStateQuota: idQuotaStates.PENDING,
            idLoan: {
                [Op.in]: ids
            }
        },
        include: [
            {
                model: Loan,
                include: [{ model: Customer, attributes: [] }],
                attributes: [],
                where: {
                    idPaymentFrequency: {
                        [Op.not]: 5,
                    }
                }
            }
        ],
        order: [['dateToPay', 'ASC']],
    })

    return _addLastLoan(quotas)
}

const _addLastLoan = async (quotas = []) => {
    for (let i = 0; i < quotas.length; i++) {
        const e = quotas[i];
        const { idCustomer } = e

        const loan = await Loan.findOne({
            where: {
                idCustomer: idCustomer,
                idStateLoan: idLoanStates.COMPLETE,
            },
            order: [['startDate', 'DESC']]
        })
        quotas[i].amountOfLastLoan = (loan?.amount ?? 0)
    }
    return quotas
}

const getIds = async () => {

    const pendings = await Loan.findAll(
        {
            attributes: {

                include: [
                    [
                        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "quotas" AS q
          WHERE q."id_loan" = "Loan"."id" AND q."id_state_quota" = ${idQuotaStates.PENDING}
        )`),
                        'quotaCount'
                    ]
                ]
            },
            include: [{ all: true }],
            order: [['startDate', 'DESC']],
            where: { idStateLoan: idLoanStates.PENDING }
        }
    )

    let ids = []
    pendings.forEach(e => {
        const { dataValues } = e
        const { id } = e
        const { quotaCount } = dataValues
        if (quotaCount == idQuotaStates.PENDING) ids.push(id)
    });

    return ids
}

module.exports = getNextRenewalRepository