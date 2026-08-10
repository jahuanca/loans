const { logger } = require("../winston")

const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    
    res.setHeader('X-Request-ID', req.id)
    // logger.error(`${req.id}:  ${err.message}`)

    res.status(statusCode).json({
        code: err.code ?? 'codigo',
        message: err.message ?? 'mensaje',
    })
}


const notFoundError = (req, res) => {
    return res.status(404).end(`Requested path ${req.path} not found`)
}

module.exports = {
    errorHandler,
    notFoundError,
}