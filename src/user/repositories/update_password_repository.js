const User = require("../db/user_model")

const updatePasswordRepository = async ({
    id,
    currentPassword,
    newPassword,
}) => {
    const userToUpdate = await User.scope(null).findByPk(id)
    if (userToUpdate == null) throw Error('No se encontro registro')    
    const isMatch = userToUpdate.correctPassword(currentPassword)
    if (!isMatch) throw Error('Error al validar')
    
    userToUpdate.password = newPassword
    await userToUpdate.save()
    return userToUpdate
}

module.exports = updatePasswordRepository