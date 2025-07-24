'use-strict'

const { createTokenRepository } = require("../../repositories/app/app_repository")

const createTokenExecute = ({id}) => createTokenRepository({id})

module.exports = createTokenExecute