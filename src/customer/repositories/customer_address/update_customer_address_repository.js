const { Op } = require("sequelize")
const { sequelize } = require("../../../utils/db/connection")
const { operationsOfLog } = require("../../../utils/core/default_values")
const CustomerAddress = require("../../db/customer_address_model")

// idCustomer no se actualiza: una direccion no se mueve de un cliente a otro.
const updateCustomerAddressRepository = ({
    id,
    idUser,
    type,
    address,
    reference,
    latitude,
    longitude,
    image,
    isPrimary,
}) => sequelize.transaction(async (transaction) => {
    const addressToUpdate = await CustomerAddress.findByPk(id, { transaction })
    if (addressToUpdate == null) {
        throw Error('No se encontro registro')
    }

    if (isPrimary) {
        await CustomerAddress.update(
            { isPrimary: false },
            {
                where: { idCustomer: addressToUpdate.idCustomer, isPrimary: true, id: { [Op.ne]: id } },
                transaction,
            },
        )
    }

    addressToUpdate.set({
        type,
        address,
        reference,
        latitude,
        longitude,
        image,
        isPrimary,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.UPDATE_CUSTOMER_ADDRESS,
    })

    await addressToUpdate.save({ transaction })
    return addressToUpdate
})

module.exports = updateCustomerAddressRepository
