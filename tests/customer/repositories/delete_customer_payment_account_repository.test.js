jest.mock('../../../src/customer/db/customer_payment_account_model', () => ({
    findByPk: jest.fn(),
}))

const CustomerPaymentAccount = require('../../../src/customer/db/customer_payment_account_model')
const deleteCustomerPaymentAccountRepository = require('../../../src/customer/repositories/customer_payment_account/delete_customer_payment_account_repository')

describe('Delete CustomerPaymentAccount repository', () => {
    afterEach(() => jest.clearAllMocks())

    test('Si la cuenta no existe, debe lanzar error', async () => {
        CustomerPaymentAccount.findByPk.mockResolvedValue(null)

        await expect(deleteCustomerPaymentAccountRepository({ id: 99 })).rejects.toThrow('No se encontro registro')
    })

    test('Debe hacer borrado logico con destroy()', async () => {
        const account = { id: 5, destroy: jest.fn().mockResolvedValue() }
        CustomerPaymentAccount.findByPk.mockResolvedValue(account)

        const result = await deleteCustomerPaymentAccountRepository({ id: 5 })

        expect(account.destroy).toHaveBeenCalledTimes(1)
        expect(result).toBe(account)
    })
})
