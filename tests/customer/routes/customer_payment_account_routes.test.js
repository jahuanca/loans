// Montamos SOLO el router de cuentas de pago (no src/app.js, que conecta a la BD).
// Se simula la capa de repositorios: routes -> validations -> controllers -> use_cases corren de verdad.
jest.mock('../../../src/customer/repositories/customer_payment_account', () => ({
    findCustomerByIdRepository: jest.fn(),
    findPaymentProviderByIdRepository: jest.fn(),
    getCustomerPaymentAccountsRepository: jest.fn(),
    getCustomerPaymentAccountRepository: jest.fn(),
    createCustomerPaymentAccountRepository: jest.fn(),
    updateCustomerPaymentAccountRepository: jest.fn(),
    deleteCustomerPaymentAccountRepository: jest.fn(),
}))
jest.mock('../../../src/utils/core/winston', () => ({
    logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
    requestLogger: (req, res, next) => {
        req.id = 'test-request-id'
        next()
    },
}))

const express = require('express')
const request = require('supertest')
const repositories = require('../../../src/customer/repositories/customer_payment_account')
const customerPaymentAccountRoutes = require('../../../src/customer/routes/customer_payment_account_routes')
const setModuleError = require('../../../src/utils/error')
const { requestLogger } = require('../../../src/utils/core/winston')

const ID_USER_TOKEN = 42
const BASE = '/customer-payment-account'

const buildApp = () => {
    const app = express()
    app.use(express.json())
    app.use(requestLogger)
    app.use((req, res, next) => {
        req.idUser = ID_USER_TOKEN
        next()
    })
    app.use(BASE, customerPaymentAccountRoutes)
    setModuleError(app)
    return app
}

describe(`rutas ${BASE}`, () => {
    let app

    beforeAll(() => { app = buildApp() })
    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => jest.restoreAllMocks())

    test('GET /customer/:idCustomer lista las cuentas del cliente', async () => {
        repositories.getCustomerPaymentAccountsRepository.mockResolvedValue([{ id: 1 }])

        const res = await request(app).get(`${BASE}/customer/3`)

        expect(res.status).toBe(200)
        expect(res.body).toEqual([{ id: 1 }])
        expect(repositories.getCustomerPaymentAccountsRepository).toHaveBeenCalledWith({ idCustomer: '3' })
    })

    test('GET /id/:id devuelve una cuenta; si no existe responde 404', async () => {
        repositories.getCustomerPaymentAccountRepository.mockResolvedValue(null)

        const res = await request(app).get(`${BASE}/id/99`)

        expect(res.status).toBe(404)
    })

    test('POST /create valida, aplica la regla de categoria y usa el idUser del token', async () => {
        repositories.findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        repositories.findPaymentProviderByIdRepository.mockResolvedValue({ id: 2, category: 'WALLET', isActive: true })
        repositories.createCustomerPaymentAccountRepository.mockResolvedValue({ id: 10 })

        const res = await request(app).post(`${BASE}/create`).send({
            idCustomer: 3,
            idPaymentProvider: 2,
            phone: '987654321',
            holderName: 'Ana Perez',
        })

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ id: 10 })
        expect(repositories.createCustomerPaymentAccountRepository).toHaveBeenCalledWith(expect.objectContaining({
            idUser: ID_USER_TOKEN,
            phone: '987654321',
            cci: null,
            isDefault: false,
        }))
    })

    test('POST /create con CCI mal formado no llega al repositorio', async () => {
        const res = await request(app).post(`${BASE}/create`).send({
            idCustomer: 3,
            idPaymentProvider: 1,
            cci: '123',
            holderName: 'Ana Perez',
        })

        // validateSquema responde 500 'Error in validation' (comportamiento actual del proyecto)
        expect(res.status).toBe(500)
        expect(repositories.createCustomerPaymentAccountRepository).not.toHaveBeenCalled()
    })

    test('PUT /update no acepta idCustomer (la cuenta no cambia de cliente)', async () => {
        const res = await request(app).put(`${BASE}/update`).send({
            id: 5,
            idCustomer: 7,
            idPaymentProvider: 1,
            cci: '00219300123456789012',
            holderName: 'Ana Perez',
        })

        expect(res.status).toBe(500)
        expect(repositories.updateCustomerPaymentAccountRepository).not.toHaveBeenCalled()
    })

    test('DELETE /delete/:id pasa el id de la URL', async () => {
        repositories.deleteCustomerPaymentAccountRepository.mockResolvedValue({ id: 9 })

        const res = await request(app).delete(`${BASE}/delete/9`)

        expect(res.status).toBe(200)
        expect(repositories.deleteCustomerPaymentAccountRepository).toHaveBeenCalledWith({ id: '9' })
    })
})
