const { updateCustomerRepository } = require('./../repositories')

const updateCustomerExecute = ({
    id,
    name,
    description,
    date,
}) => updateCustomerRepository({
    id,
    name,
    description,
    date,
})

module.exports = updateCustomerExecute