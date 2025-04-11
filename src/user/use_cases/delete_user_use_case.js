const { deleteUserRepository } = require('./../repositories')

const deleteUserExecute = ({id}) => deleteUserRepository({id})

module.exports = deleteUserExecute