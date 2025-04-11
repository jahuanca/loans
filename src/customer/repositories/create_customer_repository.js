const Customer = require("../db/customer_model");

const createCustomerRepository = ({
    name,
    lastName,
    address,
    latitude,
    longitude,
    id_type_document,
    document,
}) => {
    console.log(

        name,
        lastName,
        address,
        latitude,
        longitude,
        id_type_document,
        document,
    )
    return Customer.create({
        name,
        lastName,
        address,
        latitude,
        longitude,
        id_type_document: 1,
        document,
    })
}

module.exports = createCustomerRepository