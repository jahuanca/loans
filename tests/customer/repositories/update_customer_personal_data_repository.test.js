jest.mock('../../../src/customer/db/customer_model', () => ({ findByPk: jest.fn() }))
jest.mock('../../../src/utils/core/node_cache', () => ({ removeLocalCollection: jest.fn() }))

const Customer = require('../../../src/customer/db/customer_model')
const { removeLocalCollection } = require('../../../src/utils/core/node_cache')
const updateCustomerPersonalDataRepository = require('../../../src/customer/repositories/customer/update_customer_personal_data_repository')

const input = {
    id: 3,
    idUser: 42,
    idTypeDocument: 1,
    document: '12345678',
    alias: 'Pepe',
    name: 'Jose',
    lastName: 'Perez',
    phone: '987654321',
}

describe('Update Customer personal data repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el cliente no existe, debe lanzar error', async () => {
        Customer.findByPk.mockResolvedValue(null)

        await expect(updateCustomerPersonalDataRepository(input)).rejects.toThrow('No se encontro registro')
        expect(removeLocalCollection).not.toHaveBeenCalled()
    })

    test('Guarda solo los campos personales, registra el log y limpia la cache', async () => {
        const customer = { id: 3, set: jest.fn(), save: jest.fn().mockResolvedValue() }
        Customer.findByPk.mockResolvedValue(customer)

        const result = await updateCustomerPersonalDataRepository({ ...input, idTypeCustomer: 2, address: 'x' })

        expect(result).toBe(customer)
        expect(customer.set).toHaveBeenCalledWith({
            idTypeDocument: 1,
            document: '12345678',
            alias: 'Pepe',
            name: 'Jose',
            lastName: 'Perez',
            phone: '987654321',
            idUserOfOperation: 42,
            descriptionOperation: 'UPDATE_CUSTOMER_PERSONAL_DATA',
        })
        expect(customer.save).toHaveBeenCalled()
        expect(removeLocalCollection).toHaveBeenCalledWith('customer_key')
    })
})
