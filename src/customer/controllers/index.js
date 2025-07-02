const getCustomersController = require("./get_customers");
const getCustomerAnalyticsController = require("./get_customer_analytics");
const createCustomerController = require("./create_customer");
const updateCustomerController = require("./update_customer");
const deleteCustomerController = require("./delete_customer");

module.exports = {
    getCustomersController,
    getCustomerAnalyticsController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
}