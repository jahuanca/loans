const { getCustomerAnalyticsRepository } = require("./../../repositories");

const getCustomerAnalyticsUseCaseExecute = ({
    idCustomer
})=> getCustomerAnalyticsRepository({
    idCustomer
})

module.exports = getCustomerAnalyticsUseCaseExecute