const { deleteCustomerRepository } = require('./../repositories')

const deleteCustomerExecute = ({id}) => deleteCustomerRepository({id})

module.exports = deleteCustomerExecute