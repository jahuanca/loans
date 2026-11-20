const { Op } = require("sequelize")
const { sequelize } = require("../../../utils/db/connection")
const { operationsOfLog } = require("../../../utils/core/default_values")
const CustomerPaymentAccount = require("../../db/customer_payment_account_model")

// idCustomer no se actualiza: una cuenta no se mueve de un cliente a otro.
const updateCustomerPaymentAccountRepository = ({
    id,
    idUser,
    idPaymentProvider,
    accountNumber,
    cci,
    phone,
    holderName,
    isDefault,
    observation,
}) => sequelize.transaction(async (transaction) => {
    const accountToUpdate = await CustomerPaymentAccount.findByPk(id, { transaction })
    if (accountToUpdate == null) {
        throw Error('No se encontro registro')
    }

    if (isDefault) {
        await CustomerPaymentAccount.update(
            { isDefault: false },
            {
                where: { idCustomer: accountToUpdate.idCustomer, isDefault: true, id: { [Op.ne]: id } },
                transaction,
            },
        )
    }

    accountToUpdate.set({
        idPaymentProvider,
        accountNumber,
        cci,
        phone,
        holderName,
        isDefault,
        observation,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.UPDATE_CUSTOMER_PAYMENT_ACCOUNT,
    })

    await accountToUpdate.save({ transaction })
    return accountToUpdate
})

module.exports = updateCustomerPaymentAccountRepository
