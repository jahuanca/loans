const Loan = require("../db/loan_model")

const updateLoanRepository = async ({
    id,
    idMachine,
    idPoint,
    porcentage,
}) => {
    const loanToUpdate = await Loan.findByPk(id)
    if (loanToUpdate == null) throw Error('No se encontro registro')
    loanToUpdate.idMachine = idMachine
    loanToUpdate.idPoint = idPoint
    loanToUpdate.porcentage = porcentage

    await loanToUpdate.save()
    return loanToUpdate
}

module.exports = updateLoanRepository