jest.mock('../../../src/utils/repositories/payment_provider', () => ({
    getPaymentProvidersRepository: jest.fn(),
}))

const { getPaymentProvidersRepository } = require('../../../src/utils/repositories/payment_provider')
const getPaymentProvidersUseCaseExecute = require('../../../src/utils/use_cases/payment_provider/get_payment_providers_use_case')

describe('Get Payment Providers use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe devolver lo que entrega el repositorio', async () => {
        const providers = [{ id: 1, name: 'Yape', category: 'WALLET' }]
        getPaymentProvidersRepository.mockResolvedValue(providers)

        await expect(getPaymentProvidersUseCaseExecute()).resolves.toEqual(providers)
        expect(getPaymentProvidersRepository).toHaveBeenCalledTimes(1)
    })
})
