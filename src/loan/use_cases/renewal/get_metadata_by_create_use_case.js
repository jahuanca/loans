const getMetadataByCreateRepository = require("../../repositories/renewal/get_metadata_by_create_repository")

const getMetadataByCreateUseCaseExecute = ({
    id_customer
}) => getMetadataByCreateRepository({
    id_customer
})

module.exports = getMetadataByCreateUseCaseExecute