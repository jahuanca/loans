// Factory en jest.mock: evita cargar los repositorios reales (que importan Sequelize).
jest.mock('../../../src/customer/repositories/customer_address', () => ({
    findCustomerByIdRepository: jest.fn(),
    countCustomerAddressesRepository: jest.fn(),
    createCustomerAddressRepository: jest.fn(),
}))

const {
    findCustomerByIdRepository,
    countCustomerAddressesRepository,
    createCustomerAddressRepository,
} = require('../../../src/customer/repositories/customer_address')
const createCustomerAddressUseCaseExecute = require('../../../src/customer/use_cases/customer_address/create_customer_address_use_case')

const input = {
    idUser: 42,
    idCustomer: 3,
    type: 'BUSINESS',
    address: 'Mercado Central, puesto 12',
    image: 'customers/3/business.jpg',
    extra: 'no debe pasar',
}

describe('Create CustomerAddress use case', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el cliente no existe, debe lanzar error y no crear', async () => {
        findCustomerByIdRepository.mockResolvedValue(null)

        await expect(createCustomerAddressUseCaseExecute(input)).rejects.toThrow('El cliente no existe')
        expect(createCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('La primera direccion del cliente siempre queda como principal', async () => {
        findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        countCustomerAddressesRepository.mockResolvedValue(0)
        createCustomerAddressRepository.mockResolvedValue({ id: 10 })

        await createCustomerAddressUseCaseExecute({ ...input, isPrimary: false })

        expect(createCustomerAddressRepository).toHaveBeenCalledWith(expect.objectContaining({ isPrimary: true }))
    })

    test('Si ya tiene direcciones, respeta isPrimary y pasa solo los campos permitidos', async () => {
        findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        countCustomerAddressesRepository.mockResolvedValue(2)
        createCustomerAddressRepository.mockResolvedValue({ id: 10 })

        const result = await createCustomerAddressUseCaseExecute(input)

        expect(result).toEqual({ id: 10 })
        expect(countCustomerAddressesRepository).toHaveBeenCalledWith({ idCustomer: 3 })
        expect(createCustomerAddressRepository).toHaveBeenCalledWith({
            idUser: 42,
            idCustomer: 3,
            type: 'BUSINESS',
            address: 'Mercado Central, puesto 12',
            reference: null,
            latitude: null,
            longitude: null,
            image: 'customers/3/business.jpg',
            isPrimary: false,
        })
    })
})
