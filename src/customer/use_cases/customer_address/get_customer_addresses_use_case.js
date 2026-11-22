const { getCustomerAddressesRepository } = require("../../repositories/customer_address")

const getCustomerAddressesUseCaseExecute = ({ idCustomer }) => getCustomerAddressesRepository({ idCustomer })

module.exports = getCustomerAddressesUseCaseExecute
