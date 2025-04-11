const Quota = require("../db/quota_model")

const deleteQuotaRepository = async ({ id }) => {
    const quotaToDelete = await Quota.findByPk(id)
    if (quotaToDelete == null) throw Error('No se encontro registro')
    await quotaToDelete.destroy()
    return quotaToDelete
}

module.exports = deleteQuotaRepository