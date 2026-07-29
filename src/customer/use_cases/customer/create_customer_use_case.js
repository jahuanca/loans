const { createCustomerRepository } = require("../../repositories");

const createCustomerUseCaseExecute = (value) => createCustomerRepository(value)

module.exports = createCustomerUseCaseExecute