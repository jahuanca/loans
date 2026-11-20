jest.mock('../../../src/user/db/user_model', () => ({
    findByPk: jest.fn(),
}))

const User = require('../../../src/user/db/user_model')
const deleteUserRepository = require('../../../src/user/repositories/delete_user_repository')

describe('Delete User repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el usuario no existe, debe lanzar error', async () => {
        User.findByPk.mockResolvedValue(null)

        await expect(deleteUserRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    test('Si existe, debe hacer destroy (borrado lógico) y devolverlo', async () => {
        // Simulamos una instancia de Sequelize: un objeto con el método destroy.
        const user = { id: 9, destroy: jest.fn().mockResolvedValue() }
        User.findByPk.mockResolvedValue(user)

        const result = await deleteUserRepository({ id: 9 })

        expect(User.findByPk).toHaveBeenCalledWith(9)
        expect(user.destroy).toHaveBeenCalledTimes(1)
        expect(result).toBe(user)
    })
})
