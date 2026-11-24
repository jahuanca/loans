const { ErrorApp } = require("../../../utils/core/error/errors")
const {
    findCustomerByIdRepository,
    findTypeCustomerByIdRepository,
    findUserByIdRepository,
    updateCustomerManageDataRepository,
} = require("../../repositories")

const updateCustomerManageDataUseCaseExecute = async ({
    id,
    idUser,
    idTypeCustomer,
    idAssignedRecoveryAgent,
}) => {
    const [customer, typeCustomer, recoveryAgent] = await Promise.all([
        findCustomerByIdRepository({ id }),
        findTypeCustomerByIdRepository({ id: idTypeCustomer }),
        findUserByIdRepository({ id: idAssignedRecoveryAgent }),
    ])
    if (customer == null) throw new ErrorApp('El cliente no existe')
    if (typeCustomer == null) throw new ErrorApp('El tipo de cliente no existe')
    if (recoveryAgent == null) throw new ErrorApp('El recuperador asignado no existe')

    return updateCustomerManageDataRepository({
        id,
        idUser,
        idTypeCustomer,
        idAssignedRecoveryAgent,
    })
}

module.exports = updateCustomerManageDataUseCaseExecute
