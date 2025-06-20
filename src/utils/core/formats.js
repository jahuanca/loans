const {
    format,
} = require('date-fns')

const getFormatDate = (date = Date.now(), formatString = 'yyyy-MM-dd') => format(date, formatString)

const toFixed = (value, places = 2) => value.toFixed(places)

module.exports = {
    getFormatDate,
}