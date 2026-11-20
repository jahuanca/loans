const { ErrorApp } = require("../../../utils/core/error/errors")
const {
    findCustomerByIdRepository,
    findPaymentProviderByIdRepository,
    createCustomerPaymentAccountRepository,
} = require("../../repositories/customer_payment_account")
const normalizeAccountByCategory = require("./normalize_account_by_category")

const createCustomerPaymentAccountUseCaseExecute = async ({
    idUser,
    idCustomer,
    idPaymentProvider,
    accountNumber,
    cci,
    phone,
    holderName,
    isDefault = false,
    observation,
}) => {
    const customer = await findCustomerByIdRepository({ id: idCustomer })
    if (customer == null) throw new ErrorApp('El cliente no existe')

    const provider = await findPaymentProviderByIdRepository({ id: idPaymentProvider })
    const identifiers = normalizeAccountByCategory({ provider, accountNumber, cci, phone })

    return createCustomerPaymentAccountRepository({
        idUser,
        idCustomer,
        idPaymentProvider,
        ...identifiers,
        holderName,
        isDefault,
        observation,
    })
}

module.exports = createCustomerPaymentAccountUseCaseExecute
