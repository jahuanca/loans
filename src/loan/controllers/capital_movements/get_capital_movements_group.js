const { getPromise } = require("../../../utils/core/helpers")
const getCapitalMovementsGroupUseCase = require("../../use_cases/capital_movements/get_capital_movements_group_use_case")

const getCapitalMovementsGroupController = async (req, res) => {
    const [err, data] = await getPromise(getCapitalMovementsGroupUseCase())

    if (err) {
        return res.status(500).json(err)
    }
    res.status(200).json(data)
}

module.exports = getCapitalMovementsGroupController