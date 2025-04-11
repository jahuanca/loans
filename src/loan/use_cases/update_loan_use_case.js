const { updateLoanRepository } = require('./../repositories')

const updateLoanExecute = ({
    id,
    name,
    description,
    date,
}) => updateLoanRepository({
    id,
    name,
    description,
    date,
})

module.exports = updateLoanExecute