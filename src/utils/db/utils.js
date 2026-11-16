const ActivityLog = require("./models/activity_log_model")

const setLog = ({
    tableName,
    newValues,
    oldValues,
    typeOperation,
    descriptionOperation,
    idUser,
}) => ActivityLog.create({
    tableName: tableName,
    newRegistry: newValues,
    oldRegistry: oldValues,
    typeOperation: typeOperation,
    descriptionOperation: descriptionOperation,
    idUser: idUser,
})

module.exports = {
    setLog,
}