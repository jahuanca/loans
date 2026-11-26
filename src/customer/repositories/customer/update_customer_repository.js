const Customer = require("./../../db/customer_model")
const { keysCache, operationsOfLog } = require("../../../utils/core/default_values");
const { localNodeCache, removeLocalCollection } = require("../../../utils/core/node_cache");
const { CUSTOMER_KEY } = keysCache

const updateCustomerRepository = async ({
    id,
    idUser,
    ...data
}) => {
    const customerToUpdate = await Customer.findByPk(id)
    if (customerToUpdate == null) {
        throw Error('No se encontro registro')
    }

    const {
        idTypeDocument, idTypeCustomer, alias, 
        name, lastName,
        document, phone, idAssignedRecoveryAgent,
    } = data

    customerToUpdate.set({
        idTypeDocument,
        idTypeCustomer,
        alias,
        name,
        lastName,
        document,
        phone,
        idAssignedRecoveryAgent,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.UPDATE_CUSTOMER,
    })

    await customerToUpdate.save()
    removeLocalCollection(CUSTOMER_KEY)
    return customerToUpdate
}

module.exports = updateCustomerRepository