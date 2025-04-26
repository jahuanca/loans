const { getTypesDocumentRepository } = require("../../repositories/type_document");

const getTypesDocumentUseCaseExecute = ()=> getTypesDocumentRepository()

module.exports = getTypesDocumentUseCaseExecute