const TypeDocument = require("../../db/models/type_document_model");

const getTypesDocumentRepository = () => TypeDocument.findAll()

module.exports = getTypesDocumentRepository