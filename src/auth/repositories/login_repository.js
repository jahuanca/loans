const User = require("../../user/db/user_model");

const loginRepository = ({
    email,
    password
}) => User.findOne({
    where: {
        email,
        password,
    }
})

module.exports = loginRepository