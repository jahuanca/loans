const Customer = require("../../db/customer_model")

const findCustomerByIdRepository = ({ id }) => Customer.findByPk(id, { attributes: ['id'], raw: true })

module.exports = findCustomerByIdRepository
