const { Op } = require("sequelize")
const Loan = require("../../loan/db/loan_model")
const { sequelize } = require("../../utils/db/connection")
const Quota = require("../db/quota_model")
const { operationsOfLog } = require("../../utils/core/default_values")


const payQuotaRepository = async ({
    id_of_quota,
    paid_date,
    idUser,
}) => {
    const valueToReturn = await sequelize.transaction(async t => {
        const quota = await Quota.findByPk(id_of_quota, { transaction: t })
        const { id_loan, date_to_pay } = quota
        await validatePendings({ id_loan, date_to_pay, t })
        quota.id_state_quota = 2
        quota.paid_date = paid_date
        quota.description_operation = operationsOfLog.PAY_QUOTA
        quota.idUser = idUser,
        await quota.save({ transaction: t })
        await setLoanComplete({ id_loan, idUser, t })
        return quota
    })
    return valueToReturn
}

const validatePendings = async ({
    id_loan,
    date_to_pay,
    t
}) => {
    const countOfpendingQuotas = await Quota.count({
        where: {
            id_loan: id_loan,
            id_state_quota: 1,
            date_to_pay: {
                [Op.lt]: date_to_pay,
            }
        },
        transaction: t,
    })
    if (countOfpendingQuotas > 0) {
        throw Error('Existen cuotas pendientes que debe pagar antes que esta cuota.')
    }
}

const setLoanComplete = async ({
    id_loan,
    idUser,
    t,
}) => {
    const count = await Quota.count({
        where: { id_loan: id_loan, id_state_quota: 1 },
        transaction: t,
    })
    if (count == 0) {
        const loan = await Loan.findByPk(id_loan, { transaction: t })
        loan.id_state_loan = 2
        loan.description_operation = operationsOfLog.COMPLETE_LOAN
        loan.idUser = idUser
        await loan.save({ transaction: t})
    }
}

module.exports = payQuotaRepository