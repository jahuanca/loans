const { operationsOfLog, keysCache } = require("../../../utils/core/default_values");
const { removeLocalCollection } = require("../../../utils/core/node_cache");
const Customer = require("../../db/customer_model");

const createCustomerRepository = ({
    alias,
    name,
    phone,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
    idAssignedUser,
    idUser,
}) => {
    removeLocalCollection(keysCache.CUSTOMER_KEY)
    return Customer.create({
        alias,
        name,
        phone,
        lastName,
        address,
        latitude,
        longitude,
        idAssignedUser,
        id_type_document: id_type_document,
        document,
        idUser,
        descriptionOperation: operationsOfLog.CREATE_CUSTOMER,
    })
}

module.exports = createCustomerRepository