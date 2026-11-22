const CustomerAddress = require("../../db/customer_address_model")

// Borrado logico (paranoid): se llena deleted_at.
const deleteCustomerAddressRepository = async ({ id }) => {
    const addressToDelete = await CustomerAddress.findByPk(id)
    if (addressToDelete == null) throw Error('No se encontro registro')
    await addressToDelete.destroy()
    return addressToDelete
}

module.exports = deleteCustomerAddressRepository
