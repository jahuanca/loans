const express = require('express')
const morgan = require('morgan')
const { requestLogger } = require('./winston')

const setMiddleware = (server) => {
    server.use(morgan('tiny'))
    server.use(express.urlencoded({extended: false}))
    server.use(express.json())
    server.use(requestLogger)
}

module.exports = setMiddleware