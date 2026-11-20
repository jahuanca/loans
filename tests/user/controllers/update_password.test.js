jest.mock('../../../src/user/use_cases/update_password_use_case', () => jest.fn())
jest.mock('../../../src/utils/core/winston', () => ({ logger: { info: jest.fn(), error: jest.fn() } }))

const updatePasswordUseCase = require('../../../src/user/use_cases/update_password_use_case')
const updatePasswordController = require('../../../src/user/controllers/update_password')

const mockResponse = () => ({ status: jest.fn().mockReturnThis(), json: jest.fn() })

describe('Update Password controller', () => {
    beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    test('Debe usar el id del token (req.idUser), no uno del body', async () => {
        updatePasswordUseCase.mockResolvedValue({ id: 42 })
        const req = {
            idUser: 42, // lo deja checkTokenController
            body: { id: 1, currentPassword: 'vieja', newPassword: 'nueva' },
        }
        const res = mockResponse()
        const next = jest.fn()

        await updatePasswordController(req, res, next)

        expect(updatePasswordUseCase).toHaveBeenCalledWith({
            id: 42,
            currentPassword: 'vieja',
            newPassword: 'nueva',
        })
        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('Si la contraseña actual no coincide, debe llamar a next con error', async () => {
        updatePasswordUseCase.mockRejectedValue(new Error('Error al validar'))
        const res = mockResponse()
        const next = jest.fn()

        await updatePasswordController({ idUser: 42, body: {} }, res, next)

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500 }))
    })
})
