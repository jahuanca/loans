jest.mock('../../../src/customer/db/customer_address_model', () => ({
    findByPk: jest.fn(),
}))

const CustomerAddress = require('../../../src/customer/db/customer_address_model')
const deleteCustomerAddressRepository = require('../../../src/customer/repositories/customer_address/delete_customer_address_repository')

describe('Delete CustomerAddress repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si la direccion no existe, debe lanzar error', async () => {
        CustomerAddress.findByPk.mockResolvedValue(null)

        await expect(deleteCustomerAddressRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    test('Debe hacer borrado logico con destroy()', async () => {
        const address = { id: 5, destroy: jest.fn().mockResolvedValue() }
        CustomerAddress.findByPk.mockResolvedValue(address)

        const result = await deleteCustomerAddressRepository({ id: 5 })

        expect(address.destroy).toHaveBeenCalledTimes(1)
        expect(result).toBe(address)
    })
})
