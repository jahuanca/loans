const {
    getLastsRepository
} = require("../../repositories/activity_log");

const getLastsLogUseCaseExecute = () => getLastsRepository()

module.exports = getLastsLogUseCaseExecute