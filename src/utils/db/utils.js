const ActivityLog = require("./activity_log_model")

const setLog = ({
    tableName,
    newValues,
    oldValues,
    typeOperation,
    descriptionOperation,
}) => ActivityLog.create({
    table_name: tableName,
    new_registry: newValues,
    old_registry: oldValues,
    type_operation: typeOperation,
    description_operation: descriptionOperation,
})

module.exports = {
    setLog,
}