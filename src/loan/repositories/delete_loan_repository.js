const Loan = require("../db/loan_model")

const deleteLoanRepository = async ({ id }) => {
    const loanToDelete = await Loan.findByPk(id)
    if (loanToDelete == null) throw Error('No se encontro registro')
    await loanToDelete.destroy()
    return loanToDelete
}

module.exports = deleteLoanRepository