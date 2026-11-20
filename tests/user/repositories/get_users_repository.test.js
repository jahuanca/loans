jest.mock('../../../src/user/db/user_model', () => ({
    findAll: jest.fn(),
}))

const User = require('../../../src/user/db/user_model')
const getUsersRepository = require('../../../src/user/repositories/get_users_repository')

describe('Get Users repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Debe devolver el resultado de User.findAll', async () => {
        const users = [{ id: 1 }, { id: 2 }]
        User.findAll.mockResolvedValue(users)

        await expect(getUsersRepository()).resolves.toEqual(users)
        expect(User.findAll).toHaveBeenCalledTimes(1)
    })
})
