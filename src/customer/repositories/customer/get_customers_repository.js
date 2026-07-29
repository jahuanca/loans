const { keysCache } = require("../../../utils/core/default_values");
const { localNodeCache, removeLocalCollection, } = require("../../../utils/core/node_cache");
const Customer = require("../../db/customer_model");
const { CUSTOMER_KEY } = keysCache

const getCustomersRepository = async () => {
    const valuesSaved = localNodeCache.get(CUSTOMER_KEY)
    if (!valuesSaved) {
        const customer = await Customer.findAll({
            raw: true,
        })
        localNodeCache.set(CUSTOMER_KEY, customer)
        return customer
    }

    return valuesSaved
}

module.exports = getCustomersRepository