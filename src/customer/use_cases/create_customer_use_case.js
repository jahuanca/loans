const { createCustomerRepository } = require("../repositories");

const createCustomerUseCaseExecute = ({
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
}) => createCustomerRepository({
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
})

module.exports = createCustomerUseCaseExecute