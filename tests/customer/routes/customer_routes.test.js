// Montamos SOLO el router de clientes (no src/app.js, que conecta a la BD).
// Se simula la capa de repositorios: routes -> validations -> controllers -> use_cases corren de verdad.
jest.mock('../../../src/customer/repositories', () => ({
    createCustomerRepository: jest.fn(),
    findCustomerByIdRepository: jest.fn(),
    findTypeCustomerByIdRepository: jest.fn(),
    findUserByIdRepository: jest.fn(),
    updateCustomerPersonalDataRepository: jest.fn(),
    updateCustomerManageDataRepository: jest.fn(),
}))
// action_user_middleware carga utils/db (Sequelize); aqui no se prueba.
jest.mock('../../../src/utils/core/action_user_middleware', () => ({
    actionUser: () => (req, res, next) => next(),
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
const repositories = require('../../../src/customer/repositories')
const customerRoutes = require('../../../src/customer/routes/customer_routes')
const setModuleError = require('../../../src/utils/error')
const { requestLogger } = require('../../../src/utils/core/winston')

const ID_USER_TOKEN = 42
const BASE = '/customer'

const personalBody = {
    id: 3,
    idTypeDocument: 1,
    document: '12345678',
    alias: null,
    name: 'Jose',
    lastName: 'Perez',
    phone: '987654321',
}

const createBody = {
    idTypeDocument: 1,
    document: '12345678',
    alias: null,
    name: 'Jose',
    lastName: 'Perez',
    phone: '987654321',
    idTypeCustomer: 2,
    idAssignedRecoveryAgent: 7,
}

const manageBody = { id: 3, idTypeCustomer: 2, idAssignedRecoveryAgent: 7 }

const buildApp = () => {
    const app = express()
    app.use(express.json())
    app.use(requestLogger)
    app.use((req, res, next) => {
        req.idUser = ID_USER_TOKEN
        next()
    })
    app.use(BASE, customerRoutes)
    setModuleError(app)
    return app
}

describe(`rutas ${BASE} (update por secciones)`, () => {
    let app

    beforeAll(() => { app = buildApp() })
    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => jest.restoreAllMocks())

    describe('POST /create', () => {
        test('crea el cliente sin direccion (se agregan luego desde el detalle)', async () => {
            repositories.createCustomerRepository.mockResolvedValue({ id: 10 })

            const res = await request(app).post(`${BASE}/create`).send(createBody)

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ id: 10 })
            expect(repositories.createCustomerRepository).toHaveBeenCalledWith({
                ...createBody,
                idUser: ID_USER_TOKEN,
            })
        })

        test.each([
            ['address null', { address: null }],
            ['alias vacio', { alias: '' }],
        ])('acepta %s', async (_, changes) => {
            repositories.createCustomerRepository.mockResolvedValue({ id: 10 })

            const res = await request(app).post(`${BASE}/create`).send({ ...createBody, ...changes })

            expect(res.status).toBe(200)
        })

        test.each([
            ['sin nombre', { name: undefined }],
            ['sin tipo de cliente', { idTypeCustomer: undefined }],
            ['sin recuperador', { idAssignedRecoveryAgent: undefined }],
            ['celular invalido', { phone: '123' }],
        ])('rechaza %s', async (_, changes) => {
            const res = await request(app).post(`${BASE}/create`).send({ ...createBody, ...changes })

            expect(res.status).toBe(500)
            expect(repositories.createCustomerRepository).not.toHaveBeenCalled()
        })
    })

    describe('PUT /update-personal-data', () => {
        test('valida, usa el idUser del token y actualiza', async () => {
            repositories.findCustomerByIdRepository.mockResolvedValue({ id: 3 })
            repositories.updateCustomerPersonalDataRepository.mockResolvedValue({ id: 3, name: 'Jose' })

            const res = await request(app).put(`${BASE}/update-personal-data`).send({ ...personalBody, name: '  Jose  ' })

            expect(res.status).toBe(200)
            expect(res.body).toEqual({ id: 3, name: 'Jose' })
            expect(repositories.updateCustomerPersonalDataRepository).toHaveBeenCalledWith({
                ...personalBody,
                idUser: ID_USER_TOKEN,
            })
        })

        test('si el cliente no existe responde error y no actualiza', async () => {
            repositories.findCustomerByIdRepository.mockResolvedValue(null)

            const res = await request(app).put(`${BASE}/update-personal-data`).send(personalBody)

            expect(res.status).toBe(500)
            expect(res.body.message).toContain('El cliente no existe')
            expect(repositories.updateCustomerPersonalDataRepository).not.toHaveBeenCalled()
        })

        test.each([
            ['sin id', { id: undefined }],
            ['sin nombre', { name: undefined }],
            ['celular de 8 digitos', { phone: '98765432' }],
            ['celular con letras', { phone: '98765432a' }],
            ['alias de mas de 50', { alias: 'a'.repeat(51) }],
            ['campo de otra seccion (idTypeCustomer)', { idTypeCustomer: 2 }],
            ['campo de otra seccion (address)', { address: 'Av. Grau 123' }],
        ])('rechaza %s', async (_, changes) => {
            const res = await request(app).put(`${BASE}/update-personal-data`).send({ ...personalBody, ...changes })

            // validateSquema responde 500 'Error in validation' (comportamiento actual del proyecto)
            expect(res.status).toBe(500)
            expect(repositories.updateCustomerPersonalDataRepository).not.toHaveBeenCalled()
        })
    })

    describe('PUT /update-manage-data', () => {
        test('valida, usa el idUser del token y actualiza', async () => {
            repositories.findCustomerByIdRepository.mockResolvedValue({ id: 3 })
            repositories.findTypeCustomerByIdRepository.mockResolvedValue({ id: 2 })
            repositories.findUserByIdRepository.mockResolvedValue({ id: 7 })
            repositories.updateCustomerManageDataRepository.mockResolvedValue({ id: 3 })

            const res = await request(app).put(`${BASE}/update-manage-data`).send(manageBody)

            expect(res.status).toBe(200)
            expect(repositories.updateCustomerManageDataRepository).toHaveBeenCalledWith({
                ...manageBody,
                idUser: ID_USER_TOKEN,
            })
        })

        test('si el recuperador no existe responde error y no actualiza', async () => {
            repositories.findCustomerByIdRepository.mockResolvedValue({ id: 3 })
            repositories.findTypeCustomerByIdRepository.mockResolvedValue({ id: 2 })
            repositories.findUserByIdRepository.mockResolvedValue(null)

            const res = await request(app).put(`${BASE}/update-manage-data`).send(manageBody)

            expect(res.status).toBe(500)
            expect(res.body.message).toContain('El recuperador asignado no existe')
            expect(repositories.updateCustomerManageDataRepository).not.toHaveBeenCalled()
        })

        test.each([
            ['sin tipo de cliente', { idTypeCustomer: undefined }],
            ['sin recuperador', { idAssignedRecoveryAgent: undefined }],
            ['id no numerico', { id: 'abc' }],
            ['campo de otra seccion (name)', { name: 'Jose' }],
        ])('rechaza %s', async (_, changes) => {
            const res = await request(app).put(`${BASE}/update-manage-data`).send({ ...manageBody, ...changes })

            expect(res.status).toBe(500)
            expect(repositories.updateCustomerManageDataRepository).not.toHaveBeenCalled()
        })
    })
})
