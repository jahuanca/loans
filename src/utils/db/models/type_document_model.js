const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connection');
const { defaultTypesDocument } = require('../../core/default_values');

class TypeDocument extends Model {
    static associate(models) {
        TypeDocument.hasMany(models.User, {
            foreignKey: 'idTypeDocument'
        })
    }
}

TypeDocument.init(
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
        modelName: 'Type_Document',
    },
)

module.exports = TypeDocument