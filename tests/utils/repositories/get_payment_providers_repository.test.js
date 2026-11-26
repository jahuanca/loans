jest.mock('../../../src/utils/db/models/payment_provider_model', () => ({
    findAll: jest.fn(),
}))

const PaymentProvider = require('../../../src/utils/db/models/payment_provider_model')
const getPaymentProvidersRepository = require('../../../src/utils/repositories/payment_provider/get_payment_providers_repository')

describe('Get Payment Providers repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe pedir solo proveedores activos, con id, name y category, ordenados', async () => {
        const providers = [{ id: 3, name: 'BCP', category: 'BANK' }]
        PaymentProvider.findAll.mockResolvedValue(providers)

        await expect(getPaymentProvidersRepository()).resolves.toEqual(providers)
        expect(PaymentProvider.findAll).toHaveBeenCalledWith({
            where: { isActive: true },
            attributes: ['id', 'name', 'category'],
            order: [['category', 'ASC'], ['name', 'ASC']],
        })
    })
})
