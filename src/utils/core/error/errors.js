const ErrorApi = require("./error_api");

class ErrorServer extends ErrorApi {
    constructor(code = 500, message = '') {
        super(code, 'ERROR_SERVIDOR', message)
    }
}

class ErrorApp extends ErrorApi {
    constructor(message) {
        super(500, 'ERROR_APP', message)
    }
}

module.exports = {
    ErrorApp,
    ErrorServer,
}