const Customer = require("../../db/customer_model");

const getCustomersRepository = () => Customer.findAll()

module.exports = getCustomersRepository