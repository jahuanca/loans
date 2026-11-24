jest.mock('../../../src/customer/repositories', () => ({
    findCustomerByIdRepository: jest.fn(),
    findTypeCustomerByIdRepository: jest.fn(),
    findUserByIdRepository: jest.fn(),
    updateCustomerManageDataRepository: jest.fn(),
}))

const repositories = require('../../../src/customer/repositories')
const updateCustomerManageDataUseCaseExecute = require('../../../src/customer/use_cases/customer/update_customer_manage_data_use_case')

const input = { id: 3, idUser: 42, idTypeCustomer: 2, idAssignedRecoveryAgent: 7 }

const mockFound = ({ customer = { id: 3 }, typeCustomer = { id: 2 }, user = { id: 7 } } = {}) => {
    repositories.findCustomerByIdRepository.mockResolvedValue(customer)
    repositories.findTypeCustomerByIdRepository.mockResolvedValue(typeCustomer)
    repositories.findUserByIdRepository.mockResolvedValue(user)
}

describe('Update Customer manage data use case', () => {
    afterEach(() => jest.clearAllMocks())

    test.each([
        ['el cliente', { customer: null }, 'El cliente no existe'],
        ['el tipo de cliente', { typeCustomer: null }, 'El tipo de cliente no existe'],
        ['el recuperador', { user: null }, 'El recuperador asignado no existe'],
    ])('Si no existe %s, no debe actualizar', async (_, notFound, message) => {
        mockFound(notFound)

        await expect(updateCustomerManageDataUseCaseExecute(input)).rejects.toThrow(message)
        expect(repositories.updateCustomerManageDataRepository).not.toHaveBeenCalled()
    })

    test('Busca cada entidad por su id y actualiza', async () => {
        mockFound()
        repositories.updateCustomerManageDataRepository.mockResolvedValue({ id: 3 })

        const result = await updateCustomerManageDataUseCaseExecute(input)

        expect(result).toEqual({ id: 3 })
        expect(repositories.findCustomerByIdRepository).toHaveBeenCalledWith({ id: 3 })
        expect(repositories.findTypeCustomerByIdRepository).toHaveBeenCalledWith({ id: 2 })
        expect(repositories.findUserByIdRepository).toHaveBeenCalledWith({ id: 7 })
        expect(repositories.updateCustomerManageDataRepository).toHaveBeenCalledWith(input)
    })
})
