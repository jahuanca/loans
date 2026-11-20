const { sequelize } = require("../../../utils/db/connection")
const { operationsOfLog } = require("../../../utils/core/default_values")
const CustomerPaymentAccount = require("../../db/customer_payment_account_model")

// En una transaccion: si la nueva cuenta es principal, primero se desmarca la anterior.
// Asi no se viola el indice unico ux_customer_payment_accounts_default.
const createCustomerPaymentAccountRepository = ({
    idUser,
    idCustomer,
    idPaymentProvider,
    accountNumber,
    cci,
    phone,
    holderName,
    isDefault,
    observation,
}) => sequelize.transaction(async (transaction) => {
    if (isDefault) {
        await CustomerPaymentAccount.update(
            { isDefault: false },
            { where: { idCustomer, isDefault: true }, transaction },
        )
    }

    return CustomerPaymentAccount.create({
        idCustomer,
        idPaymentProvider,
        accountNumber,
        cci,
        phone,
        holderName,
        isDefault,
        observation,
        idUserOfOperation: idUser,
        descriptionOperation: operationsOfLog.CREATE_CUSTOMER_PAYMENT_ACCOUNT,
    }, { transaction })
})

module.exports = createCustomerPaymentAccountRepository
