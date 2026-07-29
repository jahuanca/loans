const { keysCache } = require("../../../utils/core/default_values")
const { removeLocalCollection } = require("../../../utils/core/node_cache")
const Customer = require("../../db/customer_model")

const deleteCustomerRepository = async ({ id }) => {
    const customerToDelete = await Customer.findByPk(id)
    if (customerToDelete == null) throw Error('No se encontro registro')
    await customerToDelete.destroy()
    removeLocalCollection(keysCache.CUSTOMER_KEY)
    return customerToDelete
}

module.exports = deleteCustomerRepository