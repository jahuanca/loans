// hecho por mi
const userRepository = require("../../../src/user/repositories")
const getUsersUseCaseExecute = require("../../../src/user/use_cases/get_users_use_case")

jest.mock('../../../src/user/repositories/', () => ({
    getUsersRepository: jest.fn()
}))

describe('Get Users use case', () => {
    afterEach( () => {
        jest.clearAllMocks()
    })

    test('Debe retornar todos los usuarios', async () => {
        const mockUsers = [
            { id: 1, name: '', }
        ]

        userRepository.getUsersRepository.mockResolvedValue(mockUsers)
        
        const result = await getUsersUseCaseExecute()

        expect(result).toEqual(mockUsers)

        expect(userRepository.getUsersRepository).toHaveBeenCalledTimes(1)
    })
})