const { createCustomerRepository } = require("../repositories");

const createCustomerUseCaseExecute = ({
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
}) => createCustomerRepository({
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
})

module.exports = createCustomerUseCaseExecute