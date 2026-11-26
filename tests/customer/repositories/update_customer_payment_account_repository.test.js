jest.mock('../../../src/customer/db/customer_payment_account_model', () => ({
    findByPk: jest.fn(),
    update: jest.fn(),
}))
jest.mock('../../../src/utils/db/connection', () => ({
    sequelize: { transaction: jest.fn((callback) => callback('tx')) },
}))

const { Op } = require('sequelize')
const CustomerPaymentAccount = require('../../../src/customer/db/customer_payment_account_model')
const updateCustomerPaymentAccountRepository = require('../../../src/customer/repositories/customer_payment_account/update_customer_payment_account_repository')

describe('Update CustomerPaymentAccount repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si la cuenta no existe, debe lanzar error', async () => {
        CustomerPaymentAccount.findByPk.mockResolvedValue(null)

        await expect(updateCustomerPaymentAccountRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    test('Si isDefault=true, desmarca las otras del mismo cliente y guarda', async () => {
        const account = { id: 5, idCustomer: 3, set: jest.fn(), save: jest.fn().mockResolvedValue() }
        CustomerPaymentAccount.findByPk.mockResolvedValue(account)

        await updateCustomerPaymentAccountRepository({ id: 5, idUser: 42, isDefault: true, holderName: 'Ana' })

        expect(CustomerPaymentAccount.update).toHaveBeenCalledWith(
            { isDefault: false },
            { where: { idCustomer: 3, isDefault: true, id: { [Op.ne]: 5 } }, transaction: 'tx', validate: false },
        )
        expect(account.set).toHaveBeenCalledWith(expect.objectContaining({
            holderName: 'Ana',
            isDefault: true,
            idUserOfOperation: 42,
            descriptionOperation: 'UPDATE_CUSTOMER_PAYMENT_ACCOUNT',
        }))
        expect(account.save).toHaveBeenCalledWith({ transaction: 'tx' })
    })

    test('Si isDefault=false, no toca las otras cuentas', async () => {
        const account = { id: 5, idCustomer: 3, set: jest.fn(), save: jest.fn().mockResolvedValue() }
        CustomerPaymentAccount.findByPk.mockResolvedValue(account)

        await updateCustomerPaymentAccountRepository({ id: 5, isDefault: false })

        expect(CustomerPaymentAccount.update).not.toHaveBeenCalled()
    })
})
