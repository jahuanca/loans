const Customer = require("../db/customer_model");

const createCustomerRepository = ({
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
}) => Customer.create({
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document: id_type_document,
    document,
})

module.exports = createCustomerRepository