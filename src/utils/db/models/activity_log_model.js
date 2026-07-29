const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../connection');
const User = require('../../../user/db/user_model');

class ActivityLog extends Model {
    static associate(models) {
        ActivityLog.belongsTo(models.User, {
            foreignKey: {
                name: 'id_user',
                allowNull: false,
            }
        })
    }
}

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

module.exports = ActivityLog