const createCustomerRepository = require("./create_customer_repository");
const deleteCustomerRepository = require("./delete_customer_repository");
const getCustomersRepository = require("./get_customers_repository");
const getCustomerAnalyticsRepository = require("./get_customer_analytics_repository");
const updateCustomerRepository = require("./update_customer_repository");

module.exports = {
    getCustomersRepository,
    getCustomerAnalyticsRepository,
    createCustomerRepository,
    updateCustomerRepository,
    deleteCustomerRepository,
}