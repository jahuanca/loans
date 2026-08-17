const { getPromise } = require("../../core/helpers")
const getInjectionsUseCase = require("../../use_cases/dasboard/get_injections_use_case")

const getInjectionsController = async (req, res, next) => {
    const [err, injections] = await getPromise(getInjectionsUseCase())
    if (err) {
        return next(err)
    }
    return res.status(200).json(injections)
}

module.exports = getInjectionsController