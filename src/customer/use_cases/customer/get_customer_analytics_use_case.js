const { getCustomerAnalyticsRepository } = require("./../../repositories");

const getCustomerAnalyticsUseCaseExecute = ({
    id_customer
})=> getCustomerAnalyticsRepository({
    id_customer
})

module.exports = getCustomerAnalyticsUseCaseExecute