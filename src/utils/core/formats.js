const {
    format,
} = require('date-fns')

const getFormatDate = (date = Date.now(), formatString = 'yyyy-MM-dd') => format(date, formatString)

module.exports = {
    getFormatDate,
}