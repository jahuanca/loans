const User = require("../db/user_model")

const updateUserRepository = async ({
    id,
    idMachine,
    idPoint,
    porcentage,
}) => {
    const userToUpdate = await User.findByPk(id)
    if (userToUpdate == null) throw Error('No se encontro registro')
    userToUpdate.idMachine = idMachine
    userToUpdate.idPoint = idPoint
    userToUpdate.porcentage = porcentage

    await userToUpdate.save()
    return userToUpdate
}

module.exports = updateUserRepository