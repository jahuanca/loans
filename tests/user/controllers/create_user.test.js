jest.mock('../../../src/user/use_cases/create_user_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const createUserUseCaseExecute = require('../../../src/user/use_cases/create_user_use_case')
const createUserController = require('../../../src/user/controllers/create_user')

const mockResponse = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() })

describe('Create User controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe tomar los datos del body y responder 200', async () => {
        const body = {
            name: 'Ana',
            lastName: 'Pérez',
            email: 'ana@example.com',
            password: 'secreto',
            phoneNumber: '999888777',
        }
        createUserUseCaseExecute.mockResolvedValue({ id: 5, name: 'Ana' })
        const res = mockResponse()
        const next = jest.fn()

        await createUserController({ body }, res, next)

        expect(createUserUseCaseExecute).toHaveBeenCalledWith(body)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ id: 5, name: 'Ana' })
    })

    test('Si el use case falla, debe llamar a next con un error 500', async () => {
        createUserUseCaseExecute.mockRejectedValue(new Error('email duplicado'))
        const res = mockResponse()
        const next = jest.fn()

        await createUserController({ body: {} }, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 500,
            code: 'ERROR_SERVIDOR',
        }))
        expect(res.status).not.toHaveBeenCalled()
    })
})
