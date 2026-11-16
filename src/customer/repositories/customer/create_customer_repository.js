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
    idTypeDocument,
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
        idTypeDocument: idTypeDocument,
        document,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.CREATE_CUSTOMER,
    })
}

module.exports = createCustomerRepository