const { decodeTokenRepository } = require("../../repositories/app/app_repository");

const decodeTokenExecute = (token) => decodeTokenRepository(token)

module.exports = decodeTokenExecute