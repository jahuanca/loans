const Customer = require("../db/customer_model")

const deleteCustomerRepository = async ({ id }) => {
    const customerToDelete = await Customer.findByPk(id)
    if (customerToDelete == null) throw Error('No se encontro registro')
    await customerToDelete.destroy()
    return customerToDelete
}

module.exports = deleteCustomerRepository