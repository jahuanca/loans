jest.mock('../../../src/customer/db/customer_model', () => ({ findByPk: jest.fn() }))
jest.mock('../../../src/utils/core/node_cache', () => ({ removeLocalCollection: jest.fn() }))

const Customer = require('../../../src/customer/db/customer_model')
const { removeLocalCollection } = require('../../../src/utils/core/node_cache')
const updateCustomerManageDataRepository = require('../../../src/customer/repositories/customer/update_customer_manage_data_repository')

describe('Update Customer manage data repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si el cliente no existe, debe lanzar error', async () => {
        Customer.findByPk.mockResolvedValue(null)

        await expect(updateCustomerManageDataRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    test('Guarda solo tipo de cliente y recuperador, registra el log y limpia la cache', async () => {
        const customer = { id: 3, set: jest.fn(), save: jest.fn().mockResolvedValue() }
        Customer.findByPk.mockResolvedValue(customer)

        await updateCustomerManageDataRepository({
            id: 3, idUser: 42, idTypeCustomer: 2, idAssignedRecoveryAgent: 7, name: 'no debe pasar',
        })

        expect(customer.set).toHaveBeenCalledWith({
            idTypeCustomer: 2,
            idAssignedRecoveryAgent: 7,
            idUserOfOperation: 42,
            descriptionOperation: 'UPDATE_CUSTOMER_MANAGE_DATA',
        })
        expect(customer.save).toHaveBeenCalled()
        expect(removeLocalCollection).toHaveBeenCalledWith('customer_key')
    })
})
