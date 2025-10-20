const { sequelize } = require("../../utils/db/connection")
const { payQuota } = require("../../loan/repositories/utils")

const payQuotaRepository = async ({
    id_of_quota,
    paid_date,
    idUser,
}) => {
    const valueToReturn = await sequelize.transaction(async t => {
        return await payQuota({
            id_of_quota,
            paid_date,
            idUser,
            t,
        })
    })
    return valueToReturn
}

module.exports = payQuotaRepository