const TypeDocument = require("../db/type_document_model");

const getTypesDocumentRepository = () => TypeDocument.findAll()

module.exports = getTypesDocumentRepository