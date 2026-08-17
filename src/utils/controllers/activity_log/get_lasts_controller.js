const { getPromise } = require("../../core/helpers")
const getLastsLogUseCaseExecute = require("../../use_cases/activity_log/get_lasts_log_use_case")

const getActivityLastsController = async (req , res) => {
    const {

    } = req.query

    const [err, logs] = await getPromise(getLastsLogUseCaseExecute())
    if (err) {
        return next(err)
    }
    res.status(200).json(logs)

}

module.exports = getActivityLastsController

