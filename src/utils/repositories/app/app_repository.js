'use-strict'

const jwt = require('jwt-simple')
const { addDays, timeInUnix } = require('../../core/helpers')
const PayLoadEntity = require('../../entities/payload_entity')
const { secretToken } = process.env

const createTokenRepository = ({
    id,
}) => {

    const currentTime = timeInUnix()
    const lastTime = timeInUnix(addDays(new Date(), 7))

    const payload = new PayLoadEntity(id, currentTime, lastTime)
    return jwt.encode(payload, secretToken)
}

const decodeTokenRepository = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const value = jwt.decode(token, secretToken)
            resolve(value)
        } catch (err) {
            reject({
                status: 422,
                message: err.toString()
            })
        }
    })

}

module.exports = {
    createTokenRepository,
    decodeTokenRepository,
}