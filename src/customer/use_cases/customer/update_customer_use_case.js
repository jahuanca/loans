const { updateCustomerRepository } = require('./../../repositories')

const updateCustomerExecute = (value) => updateCustomerRepository(value)

module.exports = updateCustomerExecute