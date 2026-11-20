const {
    findPaymentProviderByIdRepository,
    updateCustomerPaymentAccountRepository,
} = require("../../repositories/customer_payment_account")
const normalizeAccountByCategory = require("./normalize_account_by_category")

const updateCustomerPaymentAccountUseCaseExecute = async ({
    id,
    idUser,
    idPaymentProvider,
    accountNumber,
    cci,
    phone,
    holderName,
    isDefault = false,
    observation,
}) => {
    const provider = await findPaymentProviderByIdRepository({ id: idPaymentProvider })
    const identifiers = normalizeAccountByCategory({ provider, accountNumber, cci, phone })

    return updateCustomerPaymentAccountRepository({
        id,
        idUser,
        idPaymentProvider,
        ...identifiers,
        holderName,
        isDefault,
        observation,
    })
}

module.exports = updateCustomerPaymentAccountUseCaseExecute
