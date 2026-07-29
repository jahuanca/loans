const { operationsOfLog, keysCache } = require("../../../utils/core/default_values");
const { removeLocalCollection } = require("../../../utils/core/node_cache");
const Customer = require("../../db/customer_model");

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
}) => {
    removeLocalCollection(keysCache.CUSTOMER_KEY)
    return Customer.create({
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
}

module.exports = createCustomerRepository