jest.mock('../../../src/user/use_cases/update_user_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const updateUserExecute = require('../../../src/user/use_cases/update_user_use_case')
const updateUserController = require('../../../src/user/controllers/update_user')

const mockResponse = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() })

describe('Update User controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe enviar al use case los campos del body y responder 200', async () => {
        updateUserExecute.mockResolvedValue({ id: 1 })
        const res = mockResponse()
        const next = jest.fn()

        await updateUserController({ body: { id: 1, name: 'x', description: 'y', date: 'z' } }, res, next)

        expect(updateUserExecute).toHaveBeenCalledWith({ id: 1, name: 'x', description: 'y', date: 'z' })
        expect(res.status).toHaveBeenCalledWith(200)
    })

    // Ver update_user_use_case.test.js: los campos no coinciden con los del repositorio.
    test.todo('Debería tomar del body los campos reales del usuario')
})
