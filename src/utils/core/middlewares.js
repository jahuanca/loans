const express = require('express')
const morgan = require('morgan')

const setMiddleware = (server) => {
    server.use(morgan('tiny'))
    server.use(express.urlencoded({extended: false}))
    server.use(express.json())
}

module.exports = setMiddleware