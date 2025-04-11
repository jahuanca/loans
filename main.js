const app = require('./src/app.js')
const { successServerString } = require('./src/utils/core/strings.js')
const {
    port
} = process.env

app.listen(port, () => {
    console.log(successServerString.concat(port))
})