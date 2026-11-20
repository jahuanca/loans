// Factory en jest.mock: evita cargar el repositorio real (que importa Sequelize).
jest.mock('../../../src/user/repositories', () => ({
    createUserRepository: jest.fn(),
}))

const { createUserRepository } = require('../../../src/user/repositories')
const createUserUseCaseExecute = require('../../../src/user/use_cases/create_user_use_case')

describe('Create User use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe pasar solo los campos permitidos al repositorio', async () => {
        const created = { id: 7, name: 'Ana' }
        createUserRepository.mockResolvedValue(created)

        const result = await createUserUseCaseExecute({
            name: 'Ana',
            lastName: 'Pérez',
            email: 'ana@example.com',
            password: 'secreto',
            phoneNumber: '999888777',
            isValidated: true, // campo extra: no debe llegar al repositorio
        })

        expect(result).toEqual(created)
        expect(createUserRepository).toHaveBeenCalledWith({
            name: 'Ana',
            lastName: 'Pérez',
            email: 'ana@example.com',
            password: 'secreto',
            phoneNumber: '999888777',
        })
    })
})
