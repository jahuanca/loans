// Montamos SOLO el router de direcciones (no src/app.js, que conecta a la BD).
// Se simula la capa de repositorios: routes -> validations -> controllers -> use_cases corren de verdad.
jest.mock('../../../src/customer/repositories/customer_address', () => ({
    findCustomerByIdRepository: jest.fn(),
    countCustomerAddressesRepository: jest.fn(),
    getCustomerAddressesRepository: jest.fn(),
    getCustomerAddressRepository: jest.fn(),
    createCustomerAddressRepository: jest.fn(),
    updateCustomerAddressRepository: jest.fn(),
    deleteCustomerAddressRepository: jest.fn(),
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
const repositories = require('../../../src/customer/repositories/customer_address')
const customerAddressRoutes = require('../../../src/customer/routes/customer_address_routes')
const setModuleError = require('../../../src/utils/error')
const { requestLogger } = require('../../../src/utils/core/winston')

const ID_USER_TOKEN = 42
const BASE = '/customer-address'

const validBody = {
    idCustomer: 3,
    type: 'HOME',
    address: 'Av. Grau 123',
    latitude: -5.194449,
    longitude: -80.632822,
    image: 'customers/3/home.jpg',
}

const buildApp = () => {
    const app = express()
    app.use(express.json())
    app.use(requestLogger)
    app.use((req, res, next) => {
        req.idUser = ID_USER_TOKEN
        next()
    })
    app.use(BASE, customerAddressRoutes)
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

    test('GET /customer/:idCustomer lista las direcciones del cliente', async () => {
        repositories.getCustomerAddressesRepository.mockResolvedValue([{ id: 1 }])

        const res = await request(app).get(`${BASE}/customer/3`)

        expect(res.status).toBe(200)
        expect(res.body).toEqual([{ id: 1 }])
        expect(repositories.getCustomerAddressesRepository).toHaveBeenCalledWith({ idCustomer: '3' })
    })

    test('GET /id/:id si no existe responde 404', async () => {
        repositories.getCustomerAddressRepository.mockResolvedValue(null)

        const res = await request(app).get(`${BASE}/id/99`)

        expect(res.status).toBe(404)
    })

    test('POST /create valida, usa el idUser del token y la primera queda principal', async () => {
        repositories.findCustomerByIdRepository.mockResolvedValue({ id: 3 })
        repositories.countCustomerAddressesRepository.mockResolvedValue(0)
        repositories.createCustomerAddressRepository.mockResolvedValue({ id: 10 })

        const res = await request(app).post(`${BASE}/create`).send(validBody)

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ id: 10 })
        expect(repositories.createCustomerAddressRepository).toHaveBeenCalledWith(expect.objectContaining({
            idUser: ID_USER_TOKEN,
            latitude: -5.194449,
            longitude: -80.632822,
            isPrimary: true,
        }))
    })

    test.each([
        ['sin imagen', { image: undefined }],
        ['imagen vacia', { image: '' }],
        ['tipo invalido', { type: 'OFFICE' }],
        ['latitud fuera de rango', { latitude: -95 }],
        ['latitud sin longitud', { longitude: undefined }],
        ['longitud con latitud null', { latitude: null }],
        ['sin coordenadas', { latitude: undefined, longitude: undefined }],
        ['coordenadas null', { latitude: null, longitude: null }],
    ])('POST /create rechaza %s', async (_, changes) => {
        const res = await request(app).post(`${BASE}/create`).send({ ...validBody, ...changes })

        // validateSquema responde 500 'Error in validation' (comportamiento actual del proyecto)
        expect(res.status).toBe(500)
        expect(repositories.createCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('PUT /update no acepta idCustomer (la direccion no cambia de cliente)', async () => {
        const res = await request(app).put(`${BASE}/update`).send({ ...validBody, id: 5 })

        expect(res.status).toBe(500)
        expect(repositories.updateCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('DELETE /delete/:id de la direccion principal responde error y no borra', async () => {
        repositories.getCustomerAddressRepository.mockResolvedValue({ id: 9, isPrimary: true })

        const res = await request(app).delete(`${BASE}/delete/9`)

        expect(res.status).toBe(500)
        expect(repositories.deleteCustomerAddressRepository).not.toHaveBeenCalled()
    })

    test('DELETE /delete/:id pasa el id de la URL', async () => {
        repositories.getCustomerAddressRepository.mockResolvedValue({ id: 9, isPrimary: false })
        repositories.deleteCustomerAddressRepository.mockResolvedValue({ id: 9 })

        const res = await request(app).delete(`${BASE}/delete/9`)

        expect(res.status).toBe(200)
        expect(repositories.deleteCustomerAddressRepository).toHaveBeenCalledWith({ id: '9' })
    })
})
