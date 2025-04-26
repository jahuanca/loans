const { getPromise } = require("../../../utils/core/helpers")
const getTypesDocumentUseCaseExecute = require("../../use_cases/type_document/get_types_document_use_case")

const getTypesDocumentController = async (req, res)=> {
    const [err, typesDocument] = await getPromise(getTypesDocumentUseCaseExecute())
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(typesDocument)
}

module.exports = getTypesDocumentController