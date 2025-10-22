const { createCustomerRepository } = require("../../repositories");

const createCustomerUseCaseExecute = ({
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
    idUser,
}) => createCustomerRepository({
    alias,
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
    idUser,
})

module.exports = createCustomerUseCaseExecute