const { createRenewalRepository } = require("../../repositories")

const createRenewalUseCaseExecute = ({
    idUser,
    idCustomer,
    idNewLoan,
    idPreviousLoan,
    date,
    variationInAmount,
    idTypeRenewal,
    observation,
}) => createRenewalRepository({
    idUser,
    idCustomer,
    idNewLoan,
    idPreviousLoan,
    date,
    variationInAmount,
    idTypeRenewal,
    observation,
})

module.exports = createRenewalUseCaseExecute