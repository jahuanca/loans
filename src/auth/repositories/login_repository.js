const User = require("../../user/db/user_model");

const loginRepository = async ({
    email,
    password
}) => {
    const user = await User.scope(null).findOne({
        where: {email: email}
    })
    if (!user.correctPassword(password)) throw Error('Datos incorrectos')
    return user
}

module.exports = loginRepository