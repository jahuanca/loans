jest.mock('../../../src/user/use_cases/delete_user_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const deleteUserExecute = require('../../../src/user/use_cases/delete_user_use_case')
const deleteUserController = require('../../../src/user/controllers/delete_user')

const mockResponse = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() })

describe('Delete User controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe tomar el id de req.params y responder 200', async () => {
        deleteUserExecute.mockResolvedValue({ id: 9 })
        const res = mockResponse()
        const next = jest.fn()

        await deleteUserController({ params: { id: '9' } }, res, next)

        expect(deleteUserExecute).toHaveBeenCalledWith({ id: '9' })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ id: 9 })
    })

    test('Si el registro no existe, debe llamar a next con error', async () => {
        deleteUserExecute.mockRejectedValue(new Error('No se encontro registro'))
        const res = mockResponse()
        const next = jest.fn()

        await deleteUserController({ params: { id: '999' } }, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error: No se encontro registro',
        }))
    })
})
