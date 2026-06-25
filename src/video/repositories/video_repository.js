const fs = require('fs');
const path = require('path');

const getVideoRepository = (range) => {

    const videoPath = path.join(__dirname, '..', 'core', 'video_music.mp4');

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

        const chunkSize = end - start + 1

        const options = {
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        }

        const stream = fs.createReadStream(videoPath, { start, end })

        return {
            options: options,
            stream: stream,
        }
    } else {
        const options = {
            'Accept-Ranges': 'bytes',
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        const stream = fs.createReadStream(videoPath)

        return {
            options: options,
            stream: stream,
        }
    }
}

module.exports = getVideoRepository