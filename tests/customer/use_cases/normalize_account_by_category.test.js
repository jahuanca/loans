const normalizeAccountByCategory = require('../../../src/customer/use_cases/customer_payment_account/normalize_account_by_category')

const bank = { id: 1, category: 'BANK', isActive: true }
const wallet = { id: 2, category: 'WALLET', isActive: true }
const CCI = '00219300123456789012'

describe('normalizeAccountByCategory', () => {
    test('Si el proveedor no existe, debe lanzar error', () => {
        expect(() => normalizeAccountByCategory({ provider: null })).toThrow('El proveedor de pago no existe')
    })

    test('Si el proveedor esta inactivo, debe lanzar error', () => {
        expect(() => normalizeAccountByCategory({ provider: { ...bank, isActive: false }, cci: CCI }))
            .toThrow('El proveedor de pago no esta activo')
    })

    test('BANK sin CCI ni numero de cuenta, debe lanzar error', () => {
        expect(() => normalizeAccountByCategory({ provider: bank, phone: '987654321' }))
            .toThrow('Una cuenta bancaria requiere CCI o numero de cuenta')
    })

    test('BANK con CCI: descarta el telefono', () => {
        expect(normalizeAccountByCategory({ provider: bank, cci: CCI, phone: '987654321' }))
            .toEqual({ accountNumber: null, cci: CCI, phone: null })
    })

    test('WALLET sin telefono, debe lanzar error', () => {
        expect(() => normalizeAccountByCategory({ provider: wallet, cci: CCI }))
            .toThrow('Una billetera digital requiere telefono')
    })

    test('WALLET con telefono: descarta CCI y numero de cuenta', () => {
        expect(normalizeAccountByCategory({ provider: wallet, phone: '987654321', cci: CCI, accountNumber: '1234567890' }))
            .toEqual({ accountNumber: null, cci: null, phone: '987654321' })
    })

    test('Categoria desconocida, debe lanzar error', () => {
        expect(() => normalizeAccountByCategory({ provider: { ...bank, category: 'OTRA' }, cci: CCI }))
            .toThrow('Categoria de proveedor no soportada: OTRA')
    })
})
