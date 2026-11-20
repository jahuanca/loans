// Test unitario del controller: simulamos el use case y armamos req/res/next falsos.
// No hace falta Express ni Supertest: el controller es solo una función (req, res, next).
jest.mock('../../../src/user/use_cases/get_users_use_case', () => jest.fn())
// helpers.js importa winston, que abre archivos en logs/: lo reemplazamos.
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const getUsersUseCaseExecute = require('../../../src/user/use_cases/get_users_use_case')
const getUsersController = require('../../../src/user/controllers/get_users')

const mockResponse = () => ({
    status: jest.fn().mockReturnThis(), // permite encadenar res.status(200).json(...)
    json: jest.fn(),
})

describe('Get Users controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe responder 200 con la lista de usuarios', async () => {
        const users = [{ id: 1, name: 'Ana' }]
        getUsersUseCaseExecute.mockResolvedValue(users)
        const res = mockResponse()
        const next = jest.fn()

        await getUsersController({}, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(users)
        expect(next).not.toHaveBeenCalled()
    })

    test('Si el use case devuelve null, debe llamar a next con un error 404', async () => {
        getUsersUseCaseExecute.mockResolvedValue(null)
        const res = mockResponse()
        const next = jest.fn()

        await getUsersController({}, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 404 }))
        expect(res.status).not.toHaveBeenCalled()
    })
})
