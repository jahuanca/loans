
const app = require('./src/app.js')
const { successServerString } = require('./src/utils/core/strings.js')
const { logger } = require('./src/utils/core/winston.js')
const {
    port
} = process.env

app.listen(port, () => {
    logger.info(successServerString.concat(port))
    console.log(successServerString.concat(port))
})