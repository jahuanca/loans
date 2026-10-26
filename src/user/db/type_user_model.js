'use-strict'
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');

class TypeUser extends Model { }

TypeUser.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
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
        modelName: 'TypeUser',
    },
)

module.exports = TypeUser