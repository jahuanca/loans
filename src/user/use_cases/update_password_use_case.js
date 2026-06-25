const { updatePasswordRepository } = require('./../repositories')

const updatePasswordUseCase = ({
    id,
    currentPassword,
    newPassword,
}) => updatePasswordRepository({
    id,
    currentPassword,
    newPassword,
})

module.exports = updatePasswordUseCase