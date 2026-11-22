// Se reutiliza el de cuentas de pago: es la misma consulta (existe el cliente).
const findCustomerByIdRepository = require("../customer_payment_account/find_customer_by_id_repository")
const countCustomerAddressesRepository = require("./count_customer_addresses_repository")
const getCustomerAddressesRepository = require("./get_customer_addresses_repository")
const getCustomerAddressRepository = require("./get_customer_address_repository")
const createCustomerAddressRepository = require("./create_customer_address_repository")
const updateCustomerAddressRepository = require("./update_customer_address_repository")
const deleteCustomerAddressRepository = require("./delete_customer_address_repository")

module.exports = {
    findCustomerByIdRepository,
    countCustomerAddressesRepository,
    getCustomerAddressesRepository,
    getCustomerAddressRepository,
    createCustomerAddressRepository,
    updateCustomerAddressRepository,
    deleteCustomerAddressRepository,
}
