const { getPromise } = require("../../utils/core/helpers")
const askLangchainUseCaseExecute = require("../use_cases/ask_langchain_use_case")

const askLangchainController = async (req, res) => {
    const { question } = req.body

    const [err, data] = await getPromise(askLangchainUseCaseExecute({ question }))
    if (err) {
        return res.status(500).json({
            message: err.toString()
        })
    }
    return res.status(200).json(data)
}

module.exports = askLangchainController