const { tool } = require("langchain");
const z = require("zod");

const getWeatherTool = tool((input) => {
    return 'Its sunny'
} ,{
    name: 'get_weather',
    description: 'Get the weather for a given city',
    schema: z.object({
        city: z.string().describe('The city to get the weather for')
    })
})

module.exports = {
    getWeatherTool,
}