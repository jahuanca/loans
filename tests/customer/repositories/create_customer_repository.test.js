jest.mock('../../../src/customer/db/customer_model', () => ({ create: jest.fn() }))
jest.mock('../../../src/utils/core/node_cache', () => ({ removeLocalCollection: jest.fn() }))

const Customer = require('../../../src/customer/db/customer_model')
const { removeLocalCollection } = require('../../../src/utils/core/node_cache')
const createCustomerRepository = require('../../../src/customer/repositories/customer/create_customer_repository')

describe('Create Customer repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Guarda el tipo de cliente, registra el usuario de la operacion y limpia la cache', async () => {
        Customer.create.mockResolvedValue({ id: 10 })

        const result = await createCustomerRepository({
            idTypeCustomer: 2,
            idAssignedRecoveryAgent: 7,
            idTypeDocument: 1,
            document: '12345678',
            alias: null,
            name: 'Jose',
            lastName: 'Perez',
            phone: '987654321',
            idUser: 42,
        })

        expect(result).toEqual({ id: 10 })
        expect(removeLocalCollection).toHaveBeenCalled()
        expect(Customer.create).toHaveBeenCalledWith(expect.objectContaining({
            idTypeCustomer: 2,
            idAssignedRecoveryAgent: 7,
            name: 'Jose',
            idUserOfOperation: 42,
            descriptionOperation: 'CREATE_CUSTOMER',
        }))
    })
})
