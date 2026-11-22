jest.mock('../../../src/customer/use_cases/customer_address/create_customer_address_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const createUseCase = require('../../../src/customer/use_cases/customer_address/create_customer_address_use_case')
const createCustomerAddressController = require('../../../src/customer/controllers/customer_address/create_customer_address')

const mockResponse = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() })

describe('Create CustomerAddress controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe pasar req.value + idUser al use case y responder 200', async () => {
        createUseCase.mockResolvedValue({ id: 10 })
        const res = mockResponse()
        const next = jest.fn()

        await createCustomerAddressController({ idUser: 42, value: { idCustomer: 3, type: 'HOME' } }, res, next)

        expect(createUseCase).toHaveBeenCalledWith({ idCustomer: 3, type: 'HOME', idUser: 42 })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ id: 10 })
    })

    test('Si el use case falla, debe llamar a next con error', async () => {
        createUseCase.mockRejectedValue(new Error('El cliente no existe'))
        const res = mockResponse()
        const next = jest.fn()

        await createCustomerAddressController({ idUser: 42, value: {} }, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error: El cliente no existe' }))
        expect(res.status).not.toHaveBeenCalled()
    })
})
