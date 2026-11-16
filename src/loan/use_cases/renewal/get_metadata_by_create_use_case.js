const getMetadataByCreateRepository = require("../../repositories/renewal/get_metadata_by_create_repository")

const getMetadataByCreateUseCaseExecute = ({
    idCustomer
}) => getMetadataByCreateRepository({
    idCustomer
})

module.exports = getMetadataByCreateUseCaseExecute