jest.mock('../../../src/customer/repositories/customer_address', () => ({
    getCustomerAddressRepository: jest.fn(),
    deleteCustomerAddressRepository: jest.fn(),
}))

const {
    getCustomerAddressRepository,
    deleteCustomerAddressRepository,
} = require('../../../src/customer/repositories/customer_address')
const deleteCustomerAddressUseCaseExecute = require('../../../src/customer/use_cases/customer_address/delete_customer_address_use_case')

describe('Delete CustomerAddress use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si la direccion no existe, debe lanzar error', async () => {
        getCustomerAddressRepository.mockResolvedValue(null)

        await expect(deleteCustomerAddressUseCaseExecute({ id: 99 })).rejects.toThrow('La direccion no existe')
        expect(deleteCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('No permite borrar la direccion principal', async () => {
        getCustomerAddressRepository.mockResolvedValue({ id: 5, isPrimary: true })

        await expect(deleteCustomerAddressUseCaseExecute({ id: 5 }))
            .rejects.toThrow('No se puede eliminar la direccion principal')
        expect(deleteCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('Borra una direccion que no es principal', async () => {
        getCustomerAddressRepository.mockResolvedValue({ id: 6, isPrimary: false })
        deleteCustomerAddressRepository.mockResolvedValue({ id: 6 })

        const result = await deleteCustomerAddressUseCaseExecute({ id: 6 })

        expect(result).toEqual({ id: 6 })
        expect(deleteCustomerAddressRepository).toHaveBeenCalledWith({ id: 6 })
    })
})
