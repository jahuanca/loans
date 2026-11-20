jest.mock('../../../src/user/db/user_model', () => ({
    findByPk: jest.fn(),
}))

const User = require('../../../src/user/db/user_model')
const updateUserRepository = require('../../../src/user/repositories/update_user_repository')

describe('Update User repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el usuario no existe, debe lanzar error', async () => {
        User.findByPk.mockResolvedValue(null)

        await expect(updateUserRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    // Documenta el comportamiento ACTUAL (con el bug): asigna idMachine/idPoint/porcentage,
    // campos que no existen en user_model.js. Cuando se corrija, este test debe cambiar.
    test('Comportamiento actual: asigna idMachine, idPoint y porcentage y guarda', async () => {
        const user = { id: 1, save: jest.fn().mockResolvedValue() }
        User.findByPk.mockResolvedValue(user)

        const result = await updateUserRepository({ id: 1, idMachine: 2, idPoint: 3, porcentage: 10 })

        expect(result).toMatchObject({ idMachine: 2, idPoint: 3, porcentage: 10 })
        expect(user.save).toHaveBeenCalledTimes(1)
    })

    test.todo('Debería actualizar name, lastName, email y phoneNumber del usuario')
})
