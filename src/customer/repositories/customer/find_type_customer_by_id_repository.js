const TypeCustomer = require("../../db/type_customer_model")

const findTypeCustomerByIdRepository = ({ id }) => TypeCustomer.findByPk(id, { attributes: ['id'], raw: true })

module.exports = findTypeCustomerByIdRepository
