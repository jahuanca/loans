// En los repositorios la frontera con la BD es el modelo Sequelize: lo simulamos con factory
// para que no se ejecute user_model.js (que crea la conexión).
jest.mock('../../../src/user/db/user_model', () => ({
    create: jest.fn(),
}))

const User = require('../../../src/user/db/user_model')
const createUserRepository = require('../../../src/user/repositories/create_user_repository')

describe('Create User repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe llamar a User.create solo con los campos permitidos', async () => {
        User.create.mockResolvedValue({ id: 1 })

        const result = await createUserRepository({
            name: 'Ana',
            lastName: 'Pérez',
            email: 'ana@example.com',
            password: 'secreto',
            phoneNumber: '999888777',
            idTypeUser: 1, // extra: hoy NO se guarda (y el modelo lo exige allowNull: false)
        })

        expect(result).toEqual({ id: 1 })
        expect(User.create).toHaveBeenCalledWith({
            name: 'Ana',
            lastName: 'Pérez',
            email: 'ana@example.com',
            password: 'secreto',
            phoneNumber: '999888777',
        })
    })
})
