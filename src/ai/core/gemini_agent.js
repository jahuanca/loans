const { createAgent } = require("langchain");
const { nameOfModelsAI } = require("../../utils/core/default_values");
const { getWeatherTool } = require("./tools");
const { systemPromptForWeather } = require("./system_props");
const z = require("zod");
const { GEMINI } = nameOfModelsAI
const { GOOGLE_API_KEY } = process.env

const toolsForAgent = [
    getWeatherTool,
]

const responseFormat = z.object({
    humour_response : z.string(),
    weather_conditions : z.string()
});

const geminiAgent = createAgent({
    model: GEMINI,
    tools: toolsForAgent,
    systemPrompt: systemPromptForWeather,
    responseFormat: responseFormat,
})

module.exports = geminiAgent