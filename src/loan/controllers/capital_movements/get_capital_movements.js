const { getPromise } = require("../../../utils/core/helpers")
const getCapitalMovementsUseCase = require("../../use_cases/capital_movements/get_capital_movements_use_case")

const getCapitalMovementsController = async (req, res) => {
    const [err, data] = await getPromise( getCapitalMovementsUseCase())

    if (err) {
        return res.status(500).json(err)
    }
    res.status(200).json(data)
}

module.exports = getCapitalMovementsController