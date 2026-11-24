const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const { ErrorApp } = require('./error/errors')

const UPLOADS_ROOT = path.join(__dirname, '..', '..', '..', 'uploads')
const MAX_IMAGE_SIZE_MB = 5

const allowedImageTypes = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
}

/**
 * Middleware que recibe UNA imagen (multipart/form-data, campo `field`) y la guarda en
 * uploads/<folder>/. Deja en req.value la clave relativa ('<folder>/<archivo>'),
 * que es lo que se guarda en la BD (nunca el binario ni la ruta absoluta).
 * Reutilizable: p. ej. uploadImage({ folder: 'customers' }) para la foto del cliente.
 */
const uploadImage = ({ folder, field = 'image', uploadsRoot = UPLOADS_ROOT }) => {
    const destination = path.join(uploadsRoot, folder)

    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                fs.mkdirSync(destination, { recursive: true })
                cb(null, destination)
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${crypto.randomUUID()}${allowedImageTypes[file.mimetype]}`)
            },
        }),
        limits: { fileSize: MAX_IMAGE_SIZE_MB * 1024 * 1024, files: 1 },
        fileFilter: (req, file, cb) => {
            if (allowedImageTypes[file.mimetype]) return cb(null, true)
            return cb(new ErrorApp('Solo se permiten imagenes JPG, PNG o WEBP'))
        },
    }).single(field)

    return (req, res, next) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                const message = (err.code === 'LIMIT_FILE_SIZE')
                    ? `La imagen no debe superar ${MAX_IMAGE_SIZE_MB} MB`
                    : `No se pudo procesar la imagen (${err.code})`
                return next(new ErrorApp(message))
            }
            if (err) return next(err)
            if (!req.file) return next(new ErrorApp(`Debe enviar una imagen en el campo '${field}'`))

            req.value = { image: `${folder}/${req.file.filename}` }
            return next()
        })
    }
}

module.exports = {
    uploadImage,
    UPLOADS_ROOT,
}
