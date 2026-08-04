const { keysCache } = require("../../../utils/core/default_values");
const { LOANS_KEY } = keysCache
const { localNodeCache } = require("../../../utils/core/node_cache");
const { models } = require("../../../utils/db");
const Loan = require("./../../db/loan_model");
const User = require("../../../user/db/user_model");
const PaymentFrequency = require("../../../utils/db/models/payment_frequency_model");
const PaymentMethod = require("../../../utils/db/models/payment_method_model");
const Customer = require("../../../customer/db/customer_model");

const getLoansRepository = async ({
    id_customer,
    id_state_loan,
}) => {
    let where = {}
    if (id_state_loan != null) where.id_state_loan = id_state_loan
    if (id_customer != null) where.id_customer = id_customer

    const valuesSaved = localNodeCache.get(LOANS_KEY)

    if (!valuesSaved || id_customer) {
        return await _getInDB(where)
    }
    return valuesSaved
}

const _getInDB = async (where) => {
    const loans = await models.Loan.findAll({
        include: [
            { model: models.Payment_Frequency },
            { model: models.Payment_Method },
            { model: models.Customer },
        ],
        order: [['start_date', 'DESC']],
        where: where,
        raw: true,
        nest: true,
    })
    //TODO: este servicio se usa para listar prestamos de uno solo o de todos
    // solo trabajar con cache aquellos que son de todos.
    // localNodeCache.set(LOANS_KEY, loans)
    return loans
}

module.exports = getLoansRepository