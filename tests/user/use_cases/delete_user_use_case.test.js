jest.mock('../../../src/user/repositories', () => ({
    deleteUserRepository: jest.fn(),
}))

const { deleteUserRepository } = require('../../../src/user/repositories')
const deleteUserExecute = require('../../../src/user/use_cases/delete_user_use_case')

describe('Delete User use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe llamar al repositorio con el id', async () => {
        deleteUserRepository.mockResolvedValue({ id: 5 })

        await expect(deleteUserExecute({ id: 5 })).resolves.toEqual({ id: 5 })
        expect(deleteUserRepository).toHaveBeenCalledWith({ id: 5 })
    })

    test('Debe propagar el error del repositorio', async () => {
        deleteUserRepository.mockRejectedValue(new Error('No se encontro registro'))

        await expect(deleteUserExecute({ id: 99 })).rejects.toThrow('No se encontro registro')
    })
})
