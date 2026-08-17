const { getPromise } = require("../../core/helpers")
const getCustomersWithouLoanUseCase = require("../../use_cases/dasboard/get_customers_without_loan_use_case")

const getCustomersWithoutLoanController = async (req, res, next) => {
    const [err, customers] = await getPromise(getCustomersWithouLoanUseCase())
    if (err) {
        return next(err)
    }
    return res.status(200).json(customers)
}

module.exports = getCustomersWithoutLoanController