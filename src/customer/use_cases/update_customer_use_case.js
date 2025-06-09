const { updateCustomerRepository } = require('./../repositories')

const updateCustomerExecute = ({
    id,
    id_type_document,
    name,
    lastName,
    address,
    latitude,
    longitude,
    document,
}) => updateCustomerRepository({
    id,
    id_type_document,
    name,
    lastName,
    address,
    latitude,
    longitude,
    document,
})

module.exports = updateCustomerExecute