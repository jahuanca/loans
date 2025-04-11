const { updateQuotaRepository } = require('./../repositories')

const updateQuotaExecute = ({
    id,
    name,
    description,
    date,
}) => updateQuotaRepository({
    id,
    name,
    description,
    date,
})

module.exports = updateQuotaExecute