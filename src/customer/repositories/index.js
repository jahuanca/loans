const createCustomerRepository = require("./customer/create_customer_repository");
const deleteCustomerRepository = require("./customer/delete_customer_repository");
const getCustomersRepository = require("./customer/get_customers_repository");
const getCustomerAnalyticsRepository = require("./customer/get_customer_analytics_repository");
const updateCustomerRepository = require("./customer/update_customer_repository");
const getTypesCustomerRepository = require("./type_customer/get_types_customer_repository");

module.exports = {
    // customer
    getCustomersRepository,
    getCustomerAnalyticsRepository,
    createCustomerRepository,
    updateCustomerRepository,
    deleteCustomerRepository,

    // type_customer
    getTypesCustomerRepository,
}