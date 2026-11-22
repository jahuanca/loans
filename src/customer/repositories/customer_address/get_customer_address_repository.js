const CustomerAddress = require("../../db/customer_address_model")

const getCustomerAddressRepository = ({ id }) => CustomerAddress.findByPk(id)

module.exports = getCustomerAddressRepository
