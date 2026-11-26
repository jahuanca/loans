// Se monta SOLO el router de proveedores (no setModuleUtils, que carga todos los
// repositorios de utils y con ellos Sequelize).
jest.mock('../../../src/utils/repositories/payment_provider', () => ({
    getPaymentProvidersRepository: jest.fn(),
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
const repositories = require('../../../src/utils/repositories/payment_provider')
const paymentProviderRoutes = require('../../../src/utils/routes/payment_providers_routes')
const setModuleError = require('../../../src/utils/error')
const { requestLogger } = require('../../../src/utils/core/winston')

const buildApp = () => {
    const app = express()
    app.use(express.json())
    app.use(requestLogger)
    app.use('/utils', paymentProviderRoutes)
    setModuleError(app)
    return app
}

describe('rutas /utils/payment-provider', () => {
    let app

    beforeAll(() => { app = buildApp() })
    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => jest.restoreAllMocks())

    test('GET /utils/payment-provider responde 200 con la lista', async () => {
        const providers = [
            { id: 3, name: 'BCP', category: 'BANK' },
            { id: 1, name: 'Yape', category: 'WALLET' },
        ]
        repositories.getPaymentProvidersRepository.mockResolvedValue(providers)

        const res = await request(app).get('/utils/payment-provider')

        expect(res.status).toBe(200)
        expect(res.body).toEqual(providers)
    })

    test('GET /utils/payment-provider responde 500 si falla la base', async () => {
        repositories.getPaymentProvidersRepository.mockRejectedValue(new Error('db caida'))

        const res = await request(app).get('/utils/payment-provider')

        expect(res.status).toBe(500)
    })
})
