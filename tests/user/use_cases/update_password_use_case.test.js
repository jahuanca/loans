jest.mock('../../../src/user/repositories', () => ({
    updatePasswordRepository: jest.fn(),
}))

const { updatePasswordRepository } = require('../../../src/user/repositories')
const updatePasswordUseCase = require('../../../src/user/use_cases/update_password_use_case')

describe('Update Password use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe reenviar id, contraseña actual y nueva', async () => {
        updatePasswordRepository.mockResolvedValue({ id: 3 })

        const result = await updatePasswordUseCase({ id: 3, currentPassword: 'a', newPassword: 'b' })

        expect(result).toEqual({ id: 3 })
        expect(updatePasswordRepository).toHaveBeenCalledWith({
            id: 3, currentPassword: 'a', newPassword: 'b',
        })
    })
})
