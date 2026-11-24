const Customer = require("../../db/customer_model")
const { keysCache, operationsOfLog } = require("../../../utils/core/default_values")
const { removeLocalCollection } = require("../../../utils/core/node_cache")
const { CUSTOMER_KEY } = keysCache

// Solo toca los campos de la seccion "Informacion personal" (AddCustomerPersonalDataPage).
// El resto del cliente (tipo, recuperador, direccion) queda igual.
const updateCustomerPersonalDataRepository = async ({
    id,
    idUser,
    idTypeDocument,
    document,
    alias,
    name,
    lastName,
    phone,
}) => {
    const customerToUpdate = await Customer.findByPk(id)
    if (customerToUpdate == null) {
        throw Error('No se encontro registro')
    }

    customerToUpdate.set({
        idTypeDocument,
        document,
        alias,
        name,
        lastName,
        phone,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.UPDATE_CUSTOMER_PERSONAL_DATA,
    })

    await customerToUpdate.save()
    removeLocalCollection(CUSTOMER_KEY)
    return customerToUpdate
}

module.exports = updateCustomerPersonalDataRepository
