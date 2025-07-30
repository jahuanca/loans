const Customer = require("../db/customer_model");

const createCustomerRepository = ({
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
    idUser,
}) => Customer.create({
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document: id_type_document,
    document,
    idUser,
    description_operation: 'Se creó un nuevo cliente.',
})

module.exports = createCustomerRepository