// Simulamos el modelo y la conexion: sequelize.transaction ejecuta el callback con una transaccion falsa.
jest.mock('../../../src/customer/db/customer_address_model', () => ({
    update: jest.fn(),
    create: jest.fn(),
}))
jest.mock('../../../src/utils/db/connection', () => ({
    sequelize: { transaction: jest.fn((callback) => callback('tx')) },
}))

const CustomerAddress = require('../../../src/customer/db/customer_address_model')
const createCustomerAddressRepository = require('../../../src/customer/repositories/customer_address/create_customer_address_repository')

const data = {
    idUser: 42,
    idCustomer: 3,
    type: 'HOME',
    address: 'Av. Grau 123',
    reference: null,
    latitude: -5.194449,
    longitude: -80.632822,
    image: 'customers/3/home.jpg',
}

describe('Create CustomerAddress repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si isPrimary=false, no toca las otras direcciones', async () => {
        CustomerAddress.create.mockResolvedValue({ id: 10 })

        await createCustomerAddressRepository({ ...data, isPrimary: false })

        expect(CustomerAddress.update).not.toHaveBeenCalled()
        expect(CustomerAddress.create).toHaveBeenCalledWith(expect.objectContaining({
            idCustomer: 3,
            image: 'customers/3/home.jpg',
            idUserOfOperation: 42,
            descriptionOperation: 'CREATE_CUSTOMER_ADDRESS',
        }), { transaction: 'tx' })
    })

    test('Si isPrimary=true, desmarca la principal anterior dentro de la transaccion', async () => {
        CustomerAddress.create.mockResolvedValue({ id: 10 })

        const result = await createCustomerAddressRepository({ ...data, isPrimary: true })

        expect(result).toEqual({ id: 10 })
        expect(CustomerAddress.update).toHaveBeenCalledWith(
            { isPrimary: false },
            { where: { idCustomer: 3, isPrimary: true }, transaction: 'tx' },
        )
    })
})
