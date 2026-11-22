// Factory en jest.mock: evita cargar los repositorios reales (que importan Sequelize).
jest.mock('../../../src/customer/repositories/customer_payment_account', () => ({
    findCustomerByIdRepository: jest.fn(),
    findPaymentProviderByIdRepository: jest.fn(),
    createCustomerPaymentAccountRepository: jest.fn(),
}))

const {
    findCustomerByIdRepository,
    findPaymentProviderByIdRepository,
    createCustomerPaymentAccountRepository,
} = require('../../../src/customer/repositories/customer_payment_account')
const createCustomerPaymentAccountUseCaseExecute = require('../../../src/customer/use_cases/customer_payment_account/create_customer_payment_account_use_case')

const input = {
    idUser: 42,
    idCustomer: 3,
    idPaymentProvider: 2,
    phone: '987654321',
    cci: '00219300123456789012',
    holderName: 'Ana Perez',
    observation: 'Yape',
    extra: 'no debe pasar',
}

describe('Create CustomerPaymentAccount use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el cliente no existe, debe lanzar error y no crear', async () => {
        findCustomerByIdRepository.mockResolvedValue(null)

        await expect(createCustomerPaymentAccountUseCaseExecute(input)).rejects.toThrow('El cliente no existe')
        expect(createCustomerPaymentAccountRepository).not.toHaveBeenCalled()
    })

    test('Si la regla de categoria falla, no debe crear', async () => {
        findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        findPaymentProviderByIdRepository.mockResolvedValue({ id: 2, category: 'WALLET', isActive: true })

        await expect(createCustomerPaymentAccountUseCaseExecute({ ...input, phone: null }))
            .rejects.toThrow('Una billetera digital requiere telefono')
        expect(createCustomerPaymentAccountRepository).not.toHaveBeenCalled()
    })

    test('Billetera: pasa solo los campos permitidos, limpia CCI e isDefault=false por defecto', async () => {
        findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        findPaymentProviderByIdRepository.mockResolvedValue({ id: 2, category: 'WALLET', isActive: true })
        createCustomerPaymentAccountRepository.mockResolvedValue({ id: 10 })

        const result = await createCustomerPaymentAccountUseCaseExecute(input)

        expect(result).toEqual({ id: 10 })
        expect(findPaymentProviderByIdRepository).toHaveBeenCalledWith({ id: 2 })
        expect(createCustomerPaymentAccountRepository).toHaveBeenCalledWith({
            idUser: 42,
            idCustomer: 3,
            idPaymentProvider: 2,
            accountNumber: null,
            cci: null,
            phone: '987654321',
            holderName: 'Ana Perez',
            isDefault: false,
            observation: 'Yape',
        })
    })
})
