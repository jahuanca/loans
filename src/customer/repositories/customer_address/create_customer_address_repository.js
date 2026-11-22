const { sequelize } = require("../../../utils/db/connection")
const { operationsOfLog } = require("../../../utils/core/default_values")
const CustomerAddress = require("../../db/customer_address_model")

// En una transaccion: si la nueva direccion es principal, primero se desmarca la anterior.
// Asi no se viola el indice unico ux_customer_addresses_primary.
const createCustomerAddressRepository = ({
    idUser,
    idCustomer,
    type,
    address,
    reference,
    latitude,
    longitude,
    image,
    isPrimary,
}) => sequelize.transaction(async (transaction) => {
    if (isPrimary) {
        await CustomerAddress.update(
            { isPrimary: false },
            { where: { idCustomer, isPrimary: true }, transaction },
        )
    }

    return CustomerAddress.create({
        idCustomer,
        type,
        address,
        reference,
        latitude,
        longitude,
        image,
        isPrimary,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.CREATE_CUSTOMER_ADDRESS,
    }, { transaction })
})

module.exports = createCustomerAddressRepository
