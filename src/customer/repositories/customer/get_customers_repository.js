const { keysCache } = require("../../../utils/core/default_values");
const Customer = require("../../db/customer_model");
const { NodeCache } = require('@cacheable/node-cache')
const cache = new NodeCache({ stdTTL: 60 })
const { CUSTOMER_KEY } = keysCache

const getCustomersRepository = async () => {
    const valuesSaved = cache.get(CUSTOMER_KEY)
    if (!valuesSaved) {
        const customer = await Customer.findAll({
            raw: true
        })
        cache.set(CUSTOMER_KEY, customer)
        return customer
    }

    return valuesSaved
}

module.exports = getCustomersRepository