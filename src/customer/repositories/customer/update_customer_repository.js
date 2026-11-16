const Customer = require("./../../db/customer_model")
const { keysCache, operationsOfLog } = require("../../../utils/core/default_values");
const { localNodeCache, removeLocalCollection} = require("../../../utils/core/node_cache");
const { CUSTOMER_KEY } = keysCache

const updateCustomerRepository = async ({
    id,
    id_type_document,
    id_type_customer,
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    document,
    phone,
    idUser,
    idAssignedUser,
}) => {
    const customerToUpdate = await Customer.findByPk(id)
    if (customerToUpdate == null) {
        throw Error('No se encontro registro')
    }
    updateCustomer({
        id_type_document,
        id_type_customer,
        alias,
        name,
        lastName,
        address,
        latitude,
        longitude,
        document,
        customer: customerToUpdate,
        phone,
        idUser,
    })

    await customerToUpdate.save()
    removeLocalCollection(CUSTOMER_KEY)
    return customerToUpdate
}

const updateCustomer = ({
    id_type_document,
    id_type_customer,
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    document,
    customer,
    phone,
    idUser,
}) => {
    customer.id_type_document = id_type_document
    customer.id_type_customer = id_type_customer
    customer.alias = alias
    customer.name = name
    customer.lastName = lastName
    customer.address = address
    customer.latitude = latitude
    customer.longitude = longitude
    customer.document = document
    customer.phone = phone
    customer.descriptionOperation = operationsOfLog.UPDATE_CUSTOMER
    customer.idUser = idUser
    return customer
}

module.exports = updateCustomerRepository