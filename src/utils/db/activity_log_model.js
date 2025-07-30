const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const User = require('../../user/db/user_model');

class ActivityLog extends Model { }

ActivityLog.init(
    {
        table_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type_operation: {
            type: DataTypes.CHAR(1),
        },
        description_operation: {
            type: DataTypes.STRING,
        },
        new_registry: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        old_registry: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Activity_Log',
    }
)

ActivityLog.belongsTo(User, {foreignKey: 'id_user',})

const sync = async () => await ActivityLog.sync({ alter: false, })

sync()

module.exports = ActivityLog