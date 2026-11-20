// El repositorio usa User.scope(null).findByPk(id) para traer también el password.
// Por eso el mock de scope devuelve un objeto que tiene findByPk.
const mockFindByPk = jest.fn()

jest.mock('../../../src/user/db/user_model', () => ({
    // Las variables usadas dentro de la factory deben empezar con "mock" (regla de Jest por el hoisting).
    scope: jest.fn(() => ({ findByPk: mockFindByPk })),
}))

const User = require('../../../src/user/db/user_model')
const updatePasswordRepository = require('../../../src/user/repositories/update_password_repository')

describe('Update Password repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe quitar el defaultScope para poder leer el password', async () => {
        mockFindByPk.mockResolvedValue(null)

        await expect(updatePasswordRepository({ id: 1 })).rejects.toThrow()
        expect(User.scope).toHaveBeenCalledWith(null)
    })

    test('Si el usuario no existe, debe lanzar error', async () => {
        mockFindByPk.mockResolvedValue(null)

        await expect(updatePasswordRepository({ id: 99, currentPassword: 'a', newPassword: 'b' }))
            .rejects.toThrow('No se encontro registro')
    })

    test('Si la contraseña actual es incorrecta, debe lanzar error y no guardar', async () => {
        const user = { correctPassword: jest.fn(() => false), save: jest.fn() }
        mockFindByPk.mockResolvedValue(user)

        await expect(updatePasswordRepository({ id: 1, currentPassword: 'mal', newPassword: 'nueva' }))
            .rejects.toThrow('Error al validar')
        expect(user.correctPassword).toHaveBeenCalledWith('mal')
        expect(user.save).not.toHaveBeenCalled()
    })

    test('Si la contraseña actual es correcta, debe asignar la nueva y guardar', async () => {
        // El hash lo hace el hook beforeUpdate del modelo; aquí solo verificamos que se asigne y se guarde.
        const user = { correctPassword: jest.fn(() => true), save: jest.fn().mockResolvedValue() }
        mockFindByPk.mockResolvedValue(user)

        const result = await updatePasswordRepository({ id: 1, currentPassword: 'vieja', newPassword: 'nueva' })

        expect(result.password).toBe('nueva')
        expect(user.save).toHaveBeenCalledTimes(1)
    })
})
