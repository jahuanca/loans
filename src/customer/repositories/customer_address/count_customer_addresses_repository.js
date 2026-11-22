const CustomerAddress = require("../../db/customer_address_model")

// Cuenta solo las activas (paranoid excluye las borradas).
const countCustomerAddressesRepository = ({ idCustomer }) => CustomerAddress.count({ where: { idCustomer } })

module.exports = countCustomerAddressesRepository
