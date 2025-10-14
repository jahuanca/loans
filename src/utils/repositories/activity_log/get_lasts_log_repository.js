const ActivityLog = require("../../db/activity_log_model")

const getLastsRepository = () => ActivityLog.findAll({
    order: [['createdAt', 'DESC']]
})

module.exports = getLastsRepository