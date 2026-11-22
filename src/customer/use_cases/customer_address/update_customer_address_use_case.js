const { ErrorApp } = require("../../../utils/core/error/errors")
const {
    getCustomerAddressRepository,
    updateCustomerAddressRepository,
} = require("../../repositories/customer_address")

const updateCustomerAddressUseCaseExecute = async ({
    id,
    idUser,
    type,
    address,
    reference = null,
    latitude = null,
    longitude = null,
    image,
    isPrimary = false,
}) => {
    const current = await getCustomerAddressRepository({ id })
    if (current == null) throw new ErrorApp('La direccion no existe')

    // Desmarcar la principal dejaria al cliente sin ninguna:
    // la forma de cambiarla es marcar otra como principal.
    if (current.isPrimary && !isPrimary) {
        throw new ErrorApp('El cliente debe tener una direccion principal. Marque otra como principal')
    }

    return updateCustomerAddressRepository({
        id,
        idUser,
        type,
        address,
        reference,
        latitude,
        longitude,
        image,
        isPrimary,
    })
}

module.exports = updateCustomerAddressUseCaseExecute
