jest.mock('../../../src/customer/repositories/customer_payment_account', () => ({
    findPaymentProviderByIdRepository: jest.fn(),
    updateCustomerPaymentAccountRepository: jest.fn(),
}))

const {
    findPaymentProviderByIdRepository,
    updateCustomerPaymentAccountRepository,
} = require('../../../src/customer/repositories/customer_payment_account')
const updateCustomerPaymentAccountUseCaseExecute = require('../../../src/customer/use_cases/customer_payment_account/update_customer_payment_account_use_case')

describe('Update CustomerPaymentAccount use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Banco: limpia el telefono y pasa los campos al repositorio', async () => {
        findPaymentProviderByIdRepository.mockResolvedValue({ id: 1, category: 'BANK', isActive: true })
        updateCustomerPaymentAccountRepository.mockResolvedValue({ id: 5 })

        const result = await updateCustomerPaymentAccountUseCaseExecute({
            id: 5,
            idUser: 42,
            idPaymentProvider: 1,
            accountNumber: '1234567890',
            phone: '987654321',
            holderName: 'Ana Perez',
            isDefault: true,
        })

        expect(result).toEqual({ id: 5 })
        expect(updateCustomerPaymentAccountRepository).toHaveBeenCalledWith({
            id: 5,
            idUser: 42,
            idPaymentProvider: 1,
            accountNumber: '1234567890',
            cci: null,
            phone: null,
            holderName: 'Ana Perez',
            isDefault: true,
            observation: undefined,
        })
    })

    test('Si el proveedor no existe, no debe actualizar', async () => {
        findPaymentProviderByIdRepository.mockResolvedValue(null)

        await expect(updateCustomerPaymentAccountUseCaseExecute({ id: 5, idPaymentProvider: 99 }))
            .rejects.toThrow('El proveedor de pago no existe')
        expect(updateCustomerPaymentAccountRepository).not.toHaveBeenCalled()
    })
})
