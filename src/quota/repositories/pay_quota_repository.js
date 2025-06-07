const Quota = require("../db/quota_model")


const payQuotaRepository = async ({
    id,
    date,
}) => {
    
    const quota = await Quota.findByPk(id)
    console.log('aqui'+id)
    quota.id_state_quota = 2
    quota.paid_date = date
    await quota.save()
    return quota
}

module.exports = payQuotaRepository