const getCustomersController = require("./customer/get_customers");
const getCustomerAnalyticsController = require("./customer/get_customer_analytics");
const createCustomerController = require("./customer/create_customer");
const updateCustomerController = require("./customer/update_customer");
const deleteCustomerController = require("./customer/delete_customer");
const getAllCustomersAnalyticsController = require("./customer/get_all_customers_analytics");

module.exports = {
    getCustomersController,
    getCustomerAnalyticsController,
    getAllCustomersAnalyticsController,
    createCustomerController,
    updateCustomerController,
    deleteCustomerController,
}