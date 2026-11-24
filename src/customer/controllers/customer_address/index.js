const getCustomerAddressesController = require("./get_customer_addresses")
const getCustomerAddressController = require("./get_customer_address")
const createCustomerAddressController = require("./create_customer_address")
const updateCustomerAddressController = require("./update_customer_address")
const deleteCustomerAddressController = require("./delete_customer_address")
const uploadCustomerAddressImageController = require("./upload_customer_address_image")

module.exports = {
    getCustomerAddressesController,
    getCustomerAddressController,
    createCustomerAddressController,
    updateCustomerAddressController,
    deleteCustomerAddressController,
    uploadCustomerAddressImageController,
}
