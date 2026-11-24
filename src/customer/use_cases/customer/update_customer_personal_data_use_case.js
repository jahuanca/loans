const { ErrorApp } = require("../../../utils/core/error/errors")
const {
    findCustomerByIdRepository,
    updateCustomerPersonalDataRepository,
} = require("../../repositories")

const updateCustomerPersonalDataUseCaseExecute = async ({
    id,
    idUser,
    idTypeDocument,
    document,
    alias = null,
    name,
    lastName,
    phone,
}) => {
    const customer = await findCustomerByIdRepository({ id })
    if (customer == null) throw new ErrorApp('El cliente no existe')

    return updateCustomerPersonalDataRepository({
        id,
        idUser,
        idTypeDocument,
        document,
        alias: alias === '' ? null : alias,
        name,
        lastName,
        phone,
    })
}

module.exports = updateCustomerPersonalDataUseCaseExecute
