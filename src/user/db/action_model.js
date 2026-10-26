'use-strict'
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');

class Action extends Model {
    static associate() {
    
    }   
}

Action.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Action',
    },
)

module.exports = Action