const Customer = require("../db/customer_model")

const updateCustomerRepository = async ({
    id,
    idMachine,
    idPoint,
    porcentage,
}) => {
    const customerToUpdate = await Customer.findByPk(id)
    if (customerToUpdate == null) throw Error('No se encontro registro')
    customerToUpdate.idMachine = idMachine
    customerToUpdate.idPoint = idPoint
    customerToUpdate.porcentage = porcentage

    await customerToUpdate.save()
    return customerToUpdate
}

module.exports = updateCustomerRepository