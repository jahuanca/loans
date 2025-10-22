const { createRenewalRepository } = require("../../repositories")

const createRenewalUseCaseExecute = ({
    id_user,
    id_customer,
    id_new_loan,
    id_previous_loan,
    date,
    variation_in_amount,
    id_type_renewal,
    observation,
}) => createRenewalRepository({
    id_user,
    id_customer,
    id_new_loan,
    id_previous_loan,
    date,
    variation_in_amount,
    id_type_renewal,
    observation,
})

module.exports = createRenewalUseCaseExecute