// Prueba el middleware real de multer contra una carpeta temporal (no toca uploads/ del repo).
jest.mock('../../../src/utils/core/winston', () => ({
    logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
    requestLogger: (req, res, next) => {
        req.id = 'test-request-id'
        next()
    },
}))

const fs = require('fs')
const os = require('os')
const path = require('path')
const express = require('express')
const request = require('supertest')
const { uploadImage } = require('../../../src/utils/core/upload_image_middleware')
const setModuleError = require('../../../src/utils/error')
const { requestLogger } = require('../../../src/utils/core/winston')

// PNG de 1x1 px
const PNG_1PX = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
)

let uploadsRoot

const buildApp = () => {
    const app = express()
    app.use(requestLogger)
    app.post('/upload', uploadImage({ folder: 'tests', uploadsRoot }), (req, res) => res.status(200).json(req.value))
    setModuleError(app)
    return app
}

beforeEach(() => {
    uploadsRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'uploads-'))
})

afterEach(() => {
    fs.rmSync(uploadsRoot, { recursive: true, force: true })
})

describe('uploadImage middleware', () => {
    test('guarda la imagen y deja la clave relativa en req.value', async () => {
        const res = await request(buildApp())
            .post('/upload')
            .attach('image', PNG_1PX, { filename: 'casa.png', contentType: 'image/png' })

        expect(res.status).toBe(200)
        expect(res.body.image).toMatch(/^tests\/\d+-[0-9a-f-]+\.png$/)
        expect(fs.existsSync(path.join(uploadsRoot, res.body.image))).toBe(true)
    })

    test('rechaza archivos que no son imagen', async () => {
        const res = await request(buildApp())
            .post('/upload')
            .attach('image', Buffer.from('hola'), { filename: 'nota.txt', contentType: 'text/plain' })

        expect(res.status).toBe(500)
        expect(JSON.stringify(res.body)).toContain('Solo se permiten imagenes')
        expect(fs.readdirSync(uploadsRoot)).toHaveLength(0)
    })

    test('responde error si no se envia el campo image', async () => {
        const res = await request(buildApp()).post('/upload').field('otro', 'x')

        expect(res.status).toBe(500)
        expect(JSON.stringify(res.body)).toContain("campo 'image'")
    })

    test('rechaza un campo con otro nombre', async () => {
        const res = await request(buildApp())
            .post('/upload')
            .attach('foto', PNG_1PX, { filename: 'casa.png', contentType: 'image/png' })

        expect(res.status).toBe(500)
        expect(JSON.stringify(res.body)).toContain('LIMIT_UNEXPECTED_FILE')
    })
})
