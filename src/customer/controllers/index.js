const createCustomerController = require("./create_customer");
const getCustomersController = require("./get_customers");
const updateCustomerController = require("./update_customer");
const deleteCustomerController = require("./delete_customer");

module.exports = {
    getCustomersController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
}