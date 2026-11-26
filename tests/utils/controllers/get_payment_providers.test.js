jest.mock('../../../src/utils/use_cases/payment_provider/get_payment_providers_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const getPaymentProvidersUseCaseExecute = require('../../../src/utils/use_cases/payment_provider/get_payment_providers_use_case')
const getPaymentProvidersController = require('../../../src/utils/controllers/payment_provider/get_payment_providers')

const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
})

describe('Get Payment Providers controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe responder 200 con la lista de proveedores', async () => {
        const providers = [{ id: 1, name: 'Yape', category: 'WALLET' }]
        getPaymentProvidersUseCaseExecute.mockResolvedValue(providers)
        const res = mockResponse()
        const next = jest.fn()

        await getPaymentProvidersController({}, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(providers)
        expect(next).not.toHaveBeenCalled()
    })

    test('Si el use case falla, debe llamar a next con un error 500', async () => {
        getPaymentProvidersUseCaseExecute.mockRejectedValue(new Error('db caida'))
        const res = mockResponse()
        const next = jest.fn()

        await getPaymentProvidersController({}, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500 }))
        expect(res.status).not.toHaveBeenCalled()
    })
})
