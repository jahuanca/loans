const getVideoController = require('../controllers/video_controller')

const videoRouter = require('express').Router()

videoRouter.get('/', getVideoController)


module.exports = videoRouter