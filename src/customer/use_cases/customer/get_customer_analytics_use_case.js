const { getCustomerAnalyticsRepository } = require("./../../repositories");

const getAnalyticsCustomerUseCaseExecute = ({
    id_customer
})=> getCustomerAnalyticsRepository({
    id_customer
})

module.exports = getAnalyticsCustomerUseCaseExecute