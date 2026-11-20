jest.mock('../../../src/user/repositories', () => ({
    updateUserRepository: jest.fn(),
}))

const { updateUserRepository } = require('../../../src/user/repositories')
const updateUserExecute = require('../../../src/user/use_cases/update_user_use_case')

describe('Update User use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe reenviar los campos que recibe al repositorio', async () => {
        updateUserRepository.mockResolvedValue({ id: 1 })

        await updateUserExecute({ id: 1, name: 'x', description: 'y', date: 'z' })

        expect(updateUserRepository).toHaveBeenCalledWith({
            id: 1, name: 'x', description: 'y', date: 'z',
        })
    })

    // Bug conocido: el use case envía { name, description, date } pero
    // update_user_repository.js espera { idMachine, idPoint, porcentage } (copiado de otro módulo).
    test.todo('Debería actualizar campos reales del usuario (name, lastName, phoneNumber...)')
})
