const {
    errorHandler,
    notFoundError,
} = require("./core/error/error_handler")

const setModuleError = (server) => {
    server.use('*', notFoundError)
    server.use(errorHandler)
}

module.exports = setModuleError