const { deleteLoanRepository } = require('./../repositories')

const deleteLoanExecute = ({id}) => deleteLoanRepository({id})

module.exports = deleteLoanExecute