const Customer = require("./../../db/customer_model")

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
    if (customerToUpdate == null) throw Error('No se encontro registro')
    customerToUpdate.id_type_document = id_type_document
    customerToUpdate.id_type_customer = id_type_customer
    customerToUpdate.alias = alias
    customerToUpdate.name = name
    customerToUpdate.lastName = lastName
    customerToUpdate.address = address
    customerToUpdate.latitude = latitude
    customerToUpdate.longitude = longitude
    customerToUpdate.document = document

    console.log(id_type_customer)

    await customerToUpdate.save()
    return customerToUpdate
}

module.exports = updateCustomerRepository