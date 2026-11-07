const { askAnythingRepository } = require("../repositories/ask_anything_repository")

const askLangchainUseCaseExecute = ({
    question
}) => askAnythingRepository({question})

module.exports = askLangchainUseCaseExecute