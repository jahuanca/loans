const { payAndRenewalRepository } = require("../../repositories")

const payAndRenewalUseCaseExecute = ({
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
}) => payAndRenewalRepository({
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
})

module.exports = payAndRenewalUseCaseExecute