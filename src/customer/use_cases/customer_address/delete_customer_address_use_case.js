const { ErrorApp } = require("../../../utils/core/error/errors")
const {
    getCustomerAddressRepository,
    deleteCustomerAddressRepository,
} = require("../../repositories/customer_address")

const deleteCustomerAddressUseCaseExecute = async ({ id }) => {
    const current = await getCustomerAddressRepository({ id })
    if (current == null) throw new ErrorApp('La direccion no existe')

    // La principal no se borra: primero se marca otra como principal.
    if (current.isPrimary) {
        throw new ErrorApp('No se puede eliminar la direccion principal. Marque otra como principal primero')
    }

    return deleteCustomerAddressRepository({ id })
}

module.exports = deleteCustomerAddressUseCaseExecute
