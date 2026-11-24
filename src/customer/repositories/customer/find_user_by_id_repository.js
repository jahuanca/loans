const User = require("../../../user/db/user_model")

// Para validar que el recuperador asignado exista antes de guardarlo.
const findUserByIdRepository = ({ id }) => User.findByPk(id, { attributes: ['id'], raw: true })

module.exports = findUserByIdRepository
