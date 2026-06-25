const videoRouter = require("./routes/video_routes")

const setModuleVideo = (server) => {
    server.use('/video', videoRouter)
}

module.exports = setModuleVideo