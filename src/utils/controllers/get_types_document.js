const { getPromise } = require("../../utils/core/helpers")
const getTypesDocumentRepository = require("../use_cases/get_types_customer_use_case")

const getTypesDocumentController = async (req, res)=> {
    const [err, typesDocument] = await getPromise(getTypesDocumentRepository())
    if (err) return res.status(500).json({message: err.message})
    return res.status(200).json(typesDocument)
}

module.exports = getTypesDocumentController