const getVideoRepository = require("../repositories/video_repository")

const getVideoUseCase = (range) => getVideoRepository(range)

module.exports = getVideoUseCase