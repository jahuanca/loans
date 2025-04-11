const { deleteQuotaRepository } = require('./../repositories')

const deleteQuotaExecute = ({id}) => deleteQuotaRepository({id})

module.exports = deleteQuotaExecute