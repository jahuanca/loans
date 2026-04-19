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
            'is_last',
            'Loan.id_payment_frequency',
            [
                Sequelize.literal(
                    'CASE WHEN id_payment_frequency = 5 THEN true ELSE false END'
                ),
                'is_special'
            ],
            [
                Sequelize.fn('CONCAT',
                    Sequelize.col('Loan.Customer.name'),
                    ' ',
                    Sequelize.col('Loan.Customer.lastName')
                ),
                'customer_name'
            ],
            'Loan.Customer.alias',
            [Sequelize.col('Loan.amount'), 'amount_of_loan'],
            'id_loan',
            'amount',
            'ganancy',
            'id_state_quota',
            'date_to_pay',
            'paid_date',
        ],
        where: {
            is_last: true,
            id_state_quota: idQuotaStates.PENDING,
            id_loan: {
                [Op.in]: ids
            }
        },
        include: [
            {   model: Loan, 
                include: [{ model: Customer, attributes: [] }], 
                attributes: [],
                where: {
                    id_payment_frequency: {
                        [Op.not] : 5,
                    }
                }
            }
        ],
        order: [['date_to_pay', 'ASC']],
    })

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
          FROM "Quota" AS q
          WHERE q."id_loan" = "Loan"."id" AND q."id_state_quota" = ${idQuotaStates.PENDING}
        )`),
                        'quotaCount'
                    ]
                ]
            },
            include: [{ all: true }],
            order: [['start_date', 'DESC']],
            where: { id_state_loan: idLoanStates.PENDING }
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