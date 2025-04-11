const { createUserRepository } = require("../repositories");

const createUserUseCaseExecute = ({
    name,
    lastName,
    email,
    password,
    phoneNumber,
})=> createUserRepository({
    name,
    lastName,
    email,
    password,
    phoneNumber,
})

module.exports = createUserUseCaseExecute