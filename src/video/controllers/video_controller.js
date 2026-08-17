
const getVideoUseCase = require('../use_cases/get_video_use_case');

const getVideoController = (req, res, next) => {

    const { range } = req.headers

    try {
        const { options, stream } = getVideoUseCase(range)
        if (range) {
            res.writeHead(206, options)
        } else {
            res.writeHead(200, options)
        }
        stream.pipe(res);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = getVideoController