const { getCustomerAddressRepository } = require("../../repositories/customer_address")

const getCustomerAddressUseCaseExecute = ({ id }) => getCustomerAddressRepository({ id })

module.exports = getCustomerAddressUseCaseExecute
