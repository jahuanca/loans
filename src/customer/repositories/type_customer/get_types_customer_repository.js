const TypeCustomer = require("./../../db/type_customer_model")

const getTypesCustomerRepository = () => {
    return TypeCustomer.findAll()
}

module.exports = getTypesCustomerRepository