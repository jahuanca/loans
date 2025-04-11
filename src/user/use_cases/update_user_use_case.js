const { updateUserRepository } = require('./../repositories')

const updateUserExecute = ({
    id,
    name,
    description,
    date,
}) => updateUserRepository({
    id,
    name,
    description,
    date,
})

module.exports = updateUserExecute