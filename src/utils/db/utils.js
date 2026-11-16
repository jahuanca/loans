const ActivityLog = require("./models/activity_log_model")

const setLog = ({
    tableName,
    newValues,
    oldValues,
    typeOperation,
    descriptionOperation,
    idUserOfOperation,
}) => ActivityLog.create({
    tableName: tableName,
    newRegistry: newValues,
    oldRegistry: oldValues,
    typeOperation: typeOperation,
    descriptionOperation: descriptionOperation,
    idUser: idUserOfOperation,
})

module.exports = {
    setLog,
}