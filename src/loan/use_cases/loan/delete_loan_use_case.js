const { deleteLoanRepository } = require('./.././../repositories')

const deleteLoanUseCaseExecute = ({id}) => deleteLoanRepository({id})

module.exports = deleteLoanUseCaseExecute