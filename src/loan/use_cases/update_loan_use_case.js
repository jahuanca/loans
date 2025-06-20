const { updateLoanRepository } = require('./../repositories')

const updateLoanExecute = ({
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

module.exports = updateLoanExecute