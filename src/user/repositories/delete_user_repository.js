const User = require("../db/user_model")

const deleteUserRepository = async ({ id }) => {
    const userToDelete = await User.findByPk(id)
    if (userToDelete == null) throw Error('No se encontro registro')
    await userToDelete.destroy()
    return userToDelete
}

module.exports = deleteUserRepository