const { Router } = require("express")
const {
    getCustomerAddressesController,
    getCustomerAddressController,
    createCustomerAddressController,
    updateCustomerAddressController,
    deleteCustomerAddressController,
    uploadCustomerAddressImageController,
} = require("../controllers/customer_address")
const {
    createCustomerAddressValidation,
    updateCustomerAddressValidation,
} = require("../validations/customer_address_validation")
const { uploadImage } = require("../../utils/core/upload_image_middleware")

const customerAddressRoutes = Router()

customerAddressRoutes.get('/customer/:idCustomer', getCustomerAddressesController)
customerAddressRoutes.get('/id/:id', getCustomerAddressController)
customerAddressRoutes.post('/create', createCustomerAddressValidation, createCustomerAddressController)
customerAddressRoutes.put('/update', updateCustomerAddressValidation, updateCustomerAddressController)
customerAddressRoutes.delete('/delete/:id', deleteCustomerAddressController)
customerAddressRoutes.post('/upload-image', uploadImage({ folder: 'customer_addresses' }), uploadCustomerAddressImageController)

module.exports = customerAddressRoutes
