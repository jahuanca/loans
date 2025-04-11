const User = require("../db/user_model");

const createUserRepository = ({
    name,
    lastName,
    email,
    password,
    phoneNumber,
}) => User.create({
    name,
    lastName,
    email,
    password,
    phoneNumber,
})

module.exports = createUserRepository