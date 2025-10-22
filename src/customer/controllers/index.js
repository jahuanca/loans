const getCustomersController = require("./customer/get_customers");
const getCustomerAnalyticsController = require("./customer/get_customer_analytics");
const createCustomerController = require("./customer/create_customer");
const updateCustomerController = require("./customer/update_customer");
const deleteCustomerController = require("./customer/delete_customer");

module.exports = {
    getCustomersController,
    getCustomerAnalyticsController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
}