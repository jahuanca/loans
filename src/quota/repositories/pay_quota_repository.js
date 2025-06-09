const Loan = require("../../loan/db/loan_model")
const { sequelize } = require("../../utils/db/connection")
const Quota = require("../db/quota_model")


const payQuotaRepository = async ({
    id,
    date,
}) => {

    try {
        const result = await sequelize.transaction(async t => {
            const quota = await Quota.findByPk(id)
            const { id_loan } = quota
            const count = await Quota.count({
                where: {id_loan: id_loan, id_state_quota: 1},
            })
            quota.id_state_quota = 2
            quota.paid_date = date
            await quota.save({transaction: t})

            if (count == 1 ) {
                const loan = await Loan.findByPk(id_loan, {transaction: t})
                loan.id_state_loan = 2
                await loan.save({transaction: t})
            }

            return quota            
        })
        return result
    } catch (error) {
        console.log(error);
    }
    
    const quota = await Quota.findByPk(id)
    
    quota.id_state_quota = 2
    quota.paid_date = date
    await quota.save()
    return quota
}

module.exports = payQuotaRepository