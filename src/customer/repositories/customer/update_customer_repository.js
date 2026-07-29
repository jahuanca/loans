const Customer = require("./../../db/customer_model")
const { keysCache } = require("../../../utils/core/default_values");
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
    return customer
}

module.exports = updateCustomerRepository