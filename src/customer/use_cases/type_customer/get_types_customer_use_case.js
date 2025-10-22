const { getTypesCustomerRepository } = require("../../repositories")

const getTypesCustomerUseCaseExecute = () => getTypesCustomerRepository()

module.exports = getTypesCustomerUseCaseExecute