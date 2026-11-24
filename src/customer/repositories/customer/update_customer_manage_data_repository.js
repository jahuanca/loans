const Customer = require("../../db/customer_model")
const { keysCache, operationsOfLog } = require("../../../utils/core/default_values")
const { removeLocalCollection } = require("../../../utils/core/node_cache")
const { CUSTOMER_KEY } = keysCache

// Solo toca los campos de la seccion "Tipo de cliente" (AddCustomerManageDataPage).
const updateCustomerManageDataRepository = async ({
    id,
    idUser,
    idTypeCustomer,
    idAssignedRecoveryAgent,
}) => {
    const customerToUpdate = await Customer.findByPk(id)
    if (customerToUpdate == null) {
        throw Error('No se encontro registro')
    }

    customerToUpdate.set({
        idTypeCustomer,
        idAssignedRecoveryAgent,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.UPDATE_CUSTOMER_MANAGE_DATA,
    })

    await customerToUpdate.save()
    removeLocalCollection(CUSTOMER_KEY)
    return customerToUpdate
}

module.exports = updateCustomerManageDataRepository
