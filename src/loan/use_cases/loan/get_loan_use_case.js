const { getLoanRepository } = require("../../repositories");

const getLoanUseCaseExecute = ({ id })=> getLoanRepository({ id })

module.exports = getLoanUseCaseExecute