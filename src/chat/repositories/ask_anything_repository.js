const geminiAgent = require("../../ai/core/gemini_agent")

const askAnythingRepository = async ({
    question,
}) => {
    const response = await geminiAgent.invoke({
        messages: [{
            role: 'user',
            content: question,
        }]
    })
    const { structuredResponse, messages } = response
    const last = messages.at(-1)
    return structuredResponse ?? last
}

module.exports = {
    askAnythingRepository,
}