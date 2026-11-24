const createCustomerRepository = require("./customer/create_customer_repository");
const deleteCustomerRepository = require("./customer/delete_customer_repository");
const getCustomersRepository = require("./customer/get_customers_repository");
const getCustomerAnalyticsRepository = require("./customer/get_customer_analytics_repository");
const updateCustomerRepository = require("./customer/update_customer_repository");
const getTypesCustomerRepository = require("./type_customer/get_types_customer_repository");
const getAllCustomersAnalyticsRepository = require("./customer/get_all_customer_analytic_repository");
const updateCustomerPersonalDataRepository = require("./customer/update_customer_personal_data_repository");
const updateCustomerManageDataRepository = require("./customer/update_customer_manage_data_repository");
const findUserByIdRepository = require("./customer/find_user_by_id_repository");
const findTypeCustomerByIdRepository = require("./customer/find_type_customer_by_id_repository");
// Se reutiliza el de cuentas de pago: es la misma consulta (existe el cliente).
const findCustomerByIdRepository = require("./customer_payment_account/find_customer_by_id_repository");

module.exports = {
    // customer
    getCustomersRepository,
    getAllCustomersAnalyticsRepository,
    getCustomerAnalyticsRepository,
    createCustomerRepository,
    updateCustomerRepository,
    deleteCustomerRepository,
    updateCustomerPersonalDataRepository,
    updateCustomerManageDataRepository,
    findCustomerByIdRepository,
    findUserByIdRepository,
    findTypeCustomerByIdRepository,

    // type_customer
    getTypesCustomerRepository,
}