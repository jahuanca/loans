const { Router } = require("express");
const {
    getTypesDocumentController,
} = require("../controllers/type_document");

const typeCustomerRoutes = Router()

typeCustomerRoutes.get('/type-document', getTypesDocumentController)

module.exports = typeCustomerRoutes