const { sequelize } = require("../../utils/db/connection")
const { payQuota } = require("../../loan/repositories/utils")

const payQuotaRepository = async ({
    idOfQuota,
    paidDate,
    idUser,
}) => {
    const valueToReturn = await sequelize.transaction(async t => {
        return await payQuota({
            idOfQuota,
            paidDate,
            idUser,
            t,
        })
    })
    return valueToReturn
}

module.exports = payQuotaRepository