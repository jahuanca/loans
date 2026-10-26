'use-strict'
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');

class TypeUserAction extends Model {
    static associate(models) {
        TypeUserAction.hasMany(models.TypeUser, {foreignKey: 'id'})
        TypeUserAction.hasMany(models.Action, {foreignKey: 'id'})
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
    },
)

module.exports = TypeUserAction