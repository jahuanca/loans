const { operationsOfLog } = require("../../utils/core/default_values");
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
    description_operation: operationsOfLog.CREATE_CUSTOMER,
})

module.exports = createCustomerRepository