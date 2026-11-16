const { updateLoanRepository } = require('./.././../repositories')

const updateLoanUseCaseExecute = ({
    id,
    name,
    description,
    startDate,
}) => updateLoanRepository({
    id,
    name,
    description,
    startDate,
})

module.exports = updateLoanUseCaseExecute