const { createLoanRepository } = require("./../../repositories/index");

const createLoanUseCaseExecute = ({
    idCustomer,
    idLoanToRenew,
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
})=> createLoanRepository({
    idCustomer,
    idLoanToRenew,
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
})

module.exports = createLoanUseCaseExecute