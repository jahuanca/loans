const ActivityLog = require("../../db/activity_log_model")

const getLastsRepository = () => ActivityLog.findAll({
    order: [['createdAt', 'DESC']],
    limit: 10,
    offset: 0,
})

module.exports = getLastsRepository