jest.mock('../../../src/customer/repositories/customer_address', () => ({
    getCustomerAddressRepository: jest.fn(),
    updateCustomerAddressRepository: jest.fn(),
}))

const {
    getCustomerAddressRepository,
    updateCustomerAddressRepository,
} = require('../../../src/customer/repositories/customer_address')
const updateCustomerAddressUseCaseExecute = require('../../../src/customer/use_cases/customer_address/update_customer_address_use_case')

const input = {
    id: 5,
    idUser: 42,
    type: 'HOME',
    address: 'Av. Grau 123',
    image: 'customers/3/home.jpg',
}

describe('Update CustomerAddress use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si la direccion no existe, no debe actualizar', async () => {
        getCustomerAddressRepository.mockResolvedValue(null)

        await expect(updateCustomerAddressUseCaseExecute(input)).rejects.toThrow('La direccion no existe')
        expect(updateCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('No permite desmarcar la direccion principal', async () => {
        getCustomerAddressRepository.mockResolvedValue({ id: 5, isPrimary: true })

        await expect(updateCustomerAddressUseCaseExecute({ ...input, isPrimary: false }))
            .rejects.toThrow('El cliente debe tener una direccion principal')
        expect(updateCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('Actualiza y pasa los campos al repositorio', async () => {
        getCustomerAddressRepository.mockResolvedValue({ id: 5, isPrimary: false })
        updateCustomerAddressRepository.mockResolvedValue({ id: 5 })

        const result = await updateCustomerAddressUseCaseExecute({ ...input, isPrimary: true, latitude: -5.19, longitude: -80.63 })

        expect(result).toEqual({ id: 5 })
        expect(updateCustomerAddressRepository).toHaveBeenCalledWith({
            id: 5,
            idUser: 42,
            type: 'HOME',
            address: 'Av. Grau 123',
            reference: null,
            latitude: -5.19,
            longitude: -80.63,
            image: 'customers/3/home.jpg',
            isPrimary: true,
        })
    })
})
