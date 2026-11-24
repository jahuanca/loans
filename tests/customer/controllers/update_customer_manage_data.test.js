jest.mock('../../../src/customer/use_cases/customer/update_customer_manage_data_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const updateUseCase = require('../../../src/customer/use_cases/customer/update_customer_manage_data_use_case')
const updateCustomerManageDataController = require('../../../src/customer/controllers/customer/update_customer_manage_data')

const mockResponse = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() })

describe('Update Customer manage data controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe pasar req.value + idUser al use case y responder 200', async () => {
        updateUseCase.mockResolvedValue({ id: 3 })
        const res = mockResponse()
        const next = jest.fn()

        await updateCustomerManageDataController({ idUser: 42, value: { id: 3 } }, res, next)

        expect(updateUseCase).toHaveBeenCalledWith({ id: 3, idUser: 42 })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ id: 3 })
    })

    test('Si el use case falla, debe llamar a next con error', async () => {
        updateUseCase.mockRejectedValue(new Error('El cliente no existe'))
        const res = mockResponse()
        const next = jest.fn()

        await updateCustomerManageDataController({ idUser: 42, value: {} }, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error: El cliente no existe' }))
        expect(res.status).not.toHaveBeenCalled()
    })
})
