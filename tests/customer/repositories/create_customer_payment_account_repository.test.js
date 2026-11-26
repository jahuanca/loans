// Simulamos el modelo y la conexion: sequelize.transaction ejecuta el callback con una transaccion falsa.
jest.mock('../../../src/customer/db/customer_payment_account_model', () => ({
    update: jest.fn(),
    create: jest.fn(),
}))
jest.mock('../../../src/utils/db/connection', () => ({
    sequelize: { transaction: jest.fn((callback) => callback('tx')) },
}))

const CustomerPaymentAccount = require('../../../src/customer/db/customer_payment_account_model')
const createCustomerPaymentAccountRepository = require('../../../src/customer/repositories/customer_payment_account/create_customer_payment_account_repository')

const data = {
    idUser: 42,
    idCustomer: 3,
    idPaymentProvider: 2,
    accountNumber: null,
    cci: null,
    phone: '987654321',
    holderName: 'Ana Perez',
    observation: null,
}

describe('Create CustomerPaymentAccount repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si isDefault=false, no toca las otras cuentas', async () => {
        CustomerPaymentAccount.create.mockResolvedValue({ id: 10 })

        await createCustomerPaymentAccountRepository({ ...data, isDefault: false })

        expect(CustomerPaymentAccount.update).not.toHaveBeenCalled()
        expect(CustomerPaymentAccount.create).toHaveBeenCalledWith(expect.objectContaining({
            idCustomer: 3,
            idUserOfOperation: 42,
            descriptionOperation: 'CREATE_CUSTOMER_PAYMENT_ACCOUNT',
        }), { transaction: 'tx' })
    })

    test('Si isDefault=true, desmarca la principal anterior dentro de la transaccion', async () => {
        CustomerPaymentAccount.create.mockResolvedValue({ id: 10 })

        const result = await createCustomerPaymentAccountRepository({ ...data, isDefault: true })

        expect(result).toEqual({ id: 10 })
        expect(CustomerPaymentAccount.update).toHaveBeenCalledWith(
            { isDefault: false },
            // validate: false evita el validador de modelo hasIdentifier en el update masivo
            // (fallaba con "La cuenta debe tener CCI, numero de cuenta o telefono").
            { where: { idCustomer: 3, isDefault: true }, transaction: 'tx', validate: false },
        )
    })
})
