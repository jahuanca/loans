const { createSpecialLoanRepository } = require("./../../repositories");

const createSpecialLoanUseCaseExecute = ({
    idCustomer,
    idUser,
    idPaymentFrequency,
    idPaymentMethod,
    amount,
    percentage,
    startDate,
    ganancy,
    observation,
    idStateLoan,
    evidence,
    numberOfInstallments,
    daysBetweenInstallments,
})=> createSpecialLoanRepository({
    idCustomer,
    idUser,
    idPaymentFrequency,
    idPaymentMethod,
    amount,
    percentage,
    startDate,
    ganancy,
    observation,
    idStateLoan,
    evidence,
    numberOfInstallments,
    daysBetweenInstallments,
})

module.exports = createSpecialLoanUseCaseExecute