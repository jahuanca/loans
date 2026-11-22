const { ErrorApp } = require("../../../utils/core/error/errors")
const {
    findCustomerByIdRepository,
    countCustomerAddressesRepository,
    createCustomerAddressRepository,
} = require("../../repositories/customer_address")

const createCustomerAddressUseCaseExecute = async ({
    idUser,
    idCustomer,
    type,
    address,
    reference = null,
    latitude = null,
    longitude = null,
    image,
    isPrimary = false,
}) => {
    const customer = await findCustomerByIdRepository({ id: idCustomer })
    if (customer == null) throw new ErrorApp('El cliente no existe')

    // Regla: todo cliente con direcciones tiene una principal.
    // La primera que se registra lo es siempre, aunque no se marque.
    const totalAddresses = await countCustomerAddressesRepository({ idCustomer })
    const isFirstAddress = totalAddresses === 0

    return createCustomerAddressRepository({
        idUser,
        idCustomer,
        type,
        address,
        reference,
        latitude,
        longitude,
        image,
        isPrimary: isFirstAddress || isPrimary,
    })
}

module.exports = createCustomerAddressUseCaseExecute
