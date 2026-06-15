const { getPromise } = require("../../core/helpers")
const getInjectionsUseCase = require("../../use_cases/dasboard/get_injections_use_case")

const getInjectionsController = async (req, res) => {
    const [err, injections] = await getPromise(getInjectionsUseCase())
    if (err) return res.status(500).json({ message: err.message })
    if (injections == null) return res.status(400).json({ message: 'No se encontró injections' })
    return res.status(200).json(injections)
}

module.exports = getInjectionsController