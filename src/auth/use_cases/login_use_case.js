const { loginRepository } = require("../repositories");

const loginUseCaseExecute = ({
    email,
    password,
}) => loginRepository({
    email,
    password,
})

module.exports = loginUseCaseExecute