

const winston = require('winston');
require('winston-daily-rotate-file');
const crypto = require('crypto');

const transportError = new winston.transports.DailyRotateFile({
    filename: "logs/access/app-%DATE%.log",
    level: 'error',
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
})

const transportInfo = new winston.transports.DailyRotateFile({
    filename: "logs/app/app-%DATE%.log",
    level: 'info',
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
})

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    transports: [
        transportError,
        transportInfo,
    ],

})

process.on("uncaughtException", (err) => {
    logger.error(err);
});

process.on("unhandledRejection", (err) => {
    logger.error(err);
})

const requestLogger = (req, res, next) => {
    const uuid = crypto.randomUUID()
    req.id = uuid

    logger.info({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        id: uuid,
    });

    next();
};

module.exports = {
    logger,
    requestLogger,
}