jest.mock('../../../src/customer/db/customer_address_model', () => ({
    findByPk: jest.fn(),
    update: jest.fn(),
}))
jest.mock('../../../src/utils/db/connection', () => ({
    sequelize: { transaction: jest.fn((callback) => callback('tx')) },
}))

const { Op } = require('sequelize')
const CustomerAddress = require('../../../src/customer/db/customer_address_model')
const updateCustomerAddressRepository = require('../../../src/customer/repositories/customer_address/update_customer_address_repository')

describe('Update CustomerAddress repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si la direccion no existe, debe lanzar error', async () => {
        CustomerAddress.findByPk.mockResolvedValue(null)

        await expect(updateCustomerAddressRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    test('Si isPrimary=true, desmarca las otras del mismo cliente y guarda', async () => {
        const address = { id: 5, idCustomer: 3, set: jest.fn(), save: jest.fn().mockResolvedValue() }
        CustomerAddress.findByPk.mockResolvedValue(address)

        await updateCustomerAddressRepository({ id: 5, idUser: 42, isPrimary: true, address: 'Jr. Lima 456' })

        expect(CustomerAddress.update).toHaveBeenCalledWith(
            { isPrimary: false },
            { where: { idCustomer: 3, isPrimary: true, id: { [Op.ne]: 5 } }, transaction: 'tx' },
        )
        expect(address.set).toHaveBeenCalledWith(expect.objectContaining({
            address: 'Jr. Lima 456',
            isPrimary: true,
            idUserOfOperation: 42,
            descriptionOperation: 'UPDATE_CUSTOMER_ADDRESS',
        }))
        expect(address.set).toHaveBeenCalledWith(expect.not.objectContaining({ idCustomer: expect.anything() }))
        expect(address.save).toHaveBeenCalledWith({ transaction: 'tx' })
    })

    test('Si isPrimary=false, no toca las otras direcciones', async () => {
        const address = { id: 5, idCustomer: 3, set: jest.fn(), save: jest.fn().mockResolvedValue() }
        CustomerAddress.findByPk.mockResolvedValue(address)

        await updateCustomerAddressRepository({ id: 5, isPrimary: false })

        expect(CustomerAddress.update).not.toHaveBeenCalled()
    })
})
