const Quota = require("../db/quota_model")

const updateQuotaRepository = async ({
    id,
    idMachine,
    idPoint,
    porcentage,
}) => {
    const quotaToUpdate = await Quota.findByPk(id)
    if (quotaToUpdate == null) throw Error('No se encontro registro')
    quotaToUpdate.idMachine = idMachine
    quotaToUpdate.idPoint = idPoint
    quotaToUpdate.porcentage = porcentage

    await quotaToUpdate.save()
    return quotaToUpdate
}

module.exports = updateQuotaRepository