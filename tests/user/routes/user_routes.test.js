// Tests de rutas del módulo user con Supertest.
// Montamos SOLO el router de user en una app Express mínima (no usamos src/app.js
// porque ese archivo llama a startConnection() y se conectaría a la base real).
// Se simula la capa de repositorios, así el flujo real routes → controllers → use_cases
// se ejecuta completo y solo la base de datos queda fuera.
jest.mock('../../../src/user/repositories', () => ({
    getUsersRepository: jest.fn(),
    createUserRepository: jest.fn(),
    updateUserRepository: jest.fn(),
    updatePasswordRepository: jest.fn(),
    deleteUserRepository: jest.fn(),
}))

// winston escribe archivos en logs/ y deja handles abiertos: lo reemplazamos por un logger vacío.
jest.mock('../../../src/utils/core/winston', () => ({
    logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
    // Igual que el real, deja req.id: el errorHandler lo usa en setHeader('X-Request-ID')
    // y lanza una excepción si viene undefined.
    requestLogger: (req, res, next) => {
        req.id = 'test-request-id'
        next()
    },
}))

const express = require('express')
const request = require('supertest')
const repositories = require('../../../src/user/repositories')
const setModuleUser = require('../../../src/user')
const setModuleError = require('../../../src/utils/error')
const { requestLogger } = require('../../../src/utils/core/winston')

const ID_USER_TOKEN = 42

const buildApp = () => {
    const app = express()
    app.use(express.json())
    app.use(requestLogger)
    // Simula lo que hace checkTokenController: dejar el id del usuario autenticado en req.
    app.use((req, res, next) => {
        req.idUser = ID_USER_TOKEN
        next()
    })
    setModuleUser(app)
    setModuleError(app)
    return app
}

describe('rutas /user', () => {
    let app

    beforeAll(() => { app = buildApp() })
    beforeEach(() => {
        jest.clearAllMocks()
        // getPromise hace console.log(err) en los errores; lo silenciamos en los tests.
        jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => jest.restoreAllMocks())

    test('GET /user responde 200 con la lista de usuarios', async () => {
        repositories.getUsersRepository.mockResolvedValue([{ id: 1, name: 'Ana' }])

        const res = await request(app).get('/user')

        expect(res.status).toBe(200)
        expect(res.body).toEqual([{ id: 1, name: 'Ana' }])
    })

    test('POST /user/create envía el body al repositorio y responde 200', async () => {
        const body = {
            name: 'Ana',
            lastName: 'Pérez',
            email: 'ana@example.com',
            password: 'secreto',
            phoneNumber: '999888777',
        }
        repositories.createUserRepository.mockResolvedValue({ id: 5, name: 'Ana' })

        const res = await request(app).post('/user/create').send(body)

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ id: 5, name: 'Ana' })
        expect(repositories.createUserRepository).toHaveBeenCalledWith(body)
    })

    test('PUT /user/update-password usa el id del token, no uno del body', async () => {
        repositories.updatePasswordRepository.mockResolvedValue({ id: ID_USER_TOKEN })

        const res = await request(app)
            .put('/user/update-password')
            .send({ id: 1, currentPassword: 'vieja', newPassword: 'nueva' })

        expect(res.status).toBe(200)
        expect(repositories.updatePasswordRepository).toHaveBeenCalledWith({
            id: ID_USER_TOKEN,
            currentPassword: 'vieja',
            newPassword: 'nueva',
        })
    })

    test('DELETE /user/delete/:id pasa el id de la URL', async () => {
        repositories.deleteUserRepository.mockResolvedValue({ id: 9 })

        const res = await request(app).delete('/user/delete/9')

        expect(res.status).toBe(200)
        expect(repositories.deleteUserRepository).toHaveBeenCalledWith({ id: '9' })
    })

    test('si el repositorio falla, el handler global responde 500 con code ERROR_SERVIDOR', async () => {
        repositories.deleteUserRepository.mockRejectedValue(new Error('No se encontro registro'))

        const res = await request(app).delete('/user/delete/999')

        expect(res.status).toBe(500)
        expect(res.body).toEqual({
            code: 'ERROR_SERVIDOR',
            message: 'Error: No se encontro registro',
        })
    })

    test('si el repositorio devuelve null, responde 404', async () => {
        repositories.getUsersRepository.mockResolvedValue(null)

        const res = await request(app).get('/user')

        expect(res.status).toBe(404)
        expect(res.body.code).toBe('ERROR_SERVIDOR')
    })

    test('una ruta inexistente responde 404', async () => {
        const res = await request(app).get('/user/no-existe')

        expect(res.status).toBe(404)
    })

    // El módulo user no tiene validations/ (Joi) ni actionUser en sus rutas.
    // Este test documenta el comportamiento ACTUAL: un body vacío llega al repositorio sin validar.
    test('POST /user/create sin validación: un body vacío llega al repositorio', async () => {
        repositories.createUserRepository.mockResolvedValue({ id: 1 })

        await request(app).post('/user/create').send({})

        expect(repositories.createUserRepository).toHaveBeenCalledWith({
            name: undefined,
            lastName: undefined,
            email: undefined,
            password: undefined,
            phoneNumber: undefined,
        })
    })
    test.todo('POST /user/create con body inválido debería responder 400 (falta squemaCreate con Joi)')
})
