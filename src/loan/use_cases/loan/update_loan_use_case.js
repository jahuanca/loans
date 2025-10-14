const { updateLoanRepository } = require('./.././../repositories')

const updateLoanUseCaseExecute = ({
    id,
    name,
    description,
    start_date,
}) => updateLoanRepository({
    id,
    name,
    description,
    start_date,
})

module.exports = updateLoanUseCaseExecute