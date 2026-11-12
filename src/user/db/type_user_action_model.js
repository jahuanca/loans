'use-strict'
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');

class TypeUserAction extends Model {
    static associate(models) {
        TypeUserAction.belongsTo(models.TypeUser, { foreignKey: 'idTypeUser' })
        TypeUserAction.belongsTo(models.Action, { foreignKey: 'idAction' })
    }
}

TypeUserAction.init(
    {
        idTypeUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idAction: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        observation: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'TypeUserAction',
        tableName: 'type_user_actions',
        underscored: true,
    },
)

module.exports = TypeUserAction