const { payAndRenewalSpecialRepository } = require("../../repositories")

const payAndRenewalSpecialUseCaseExecute = ({
    idLoanToRenew,

    idOfQuota,
    paidDate,
    idUser,

    idCustomer,
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
}) => payAndRenewalSpecialRepository({
    idLoanToRenew,

    idOfQuota,
    paidDate,
    idUser,

    idCustomer,
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

module.exports = payAndRenewalSpecialUseCaseExecute