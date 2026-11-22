const CustomerAddress = require("../../db/customer_address_model")

// Primero la direccion principal, luego por orden de registro.
const getCustomerAddressesRepository = ({ idCustomer }) => CustomerAddress.findAll({
    where: { idCustomer },
    order: [['isPrimary', 'DESC'], ['id', 'ASC']],
})

module.exports = getCustomerAddressesRepository
