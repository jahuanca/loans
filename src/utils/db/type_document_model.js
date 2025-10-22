const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { defaultTypesDocument } = require('../core/default_values');

class TypeDocument extends Model { }

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
);

(async () => {
    await TypeDocument.sync({ alter: false, })
        .then(async () => {
            const size = await TypeDocument.count()
            if (size > 0) return;
            await TypeDocument.bulkCreate(
                defaultTypesDocument
            )
        })
})();

module.exports = TypeDocument