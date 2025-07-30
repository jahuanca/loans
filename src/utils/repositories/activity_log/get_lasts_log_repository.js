const ActivityLog = require("../../db/activity_log_model")

const getLastsRepository = () => ActivityLog.findAll()

module.exports = getLastsRepository