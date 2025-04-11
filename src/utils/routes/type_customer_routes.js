const { Router } = require("express");
const {
    getTypesDocumentController,
} = require("../controllers");

const typeCustomerRoutes = Router()

typeCustomerRoutes.get('/type-document', getTypesDocumentController)

module.exports = typeCustomerRoutes