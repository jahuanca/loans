const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../connection');

class ActivityLog extends Model {
    static associate(models) {
        ActivityLog.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
                name: 'idUser',
                allowNull: false,
            }
        })
    }
}

ActivityLog.init(
    {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tableName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeOperation: {
            type: DataTypes.CHAR(1),
        },
        descriptionOperation: {
            type: DataTypes.STRING,
        },
        newRegistry: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        oldRegistry: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'ActivityLog',
        tableName: 'activity_logs',
        underscored: true,
    }
)

module.exports = ActivityLog