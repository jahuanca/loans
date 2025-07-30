const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');

class Customer extends Model { }

Customer.init(
    {
        alias: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        id_type_document: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        document: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        idUser: {
            type: DataTypes.VIRTUAL,
        }
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Customer',
    },
);

(async () => {
    await Customer.sync({alter: false,})
})();

Customer.afterCreate((record, options)=> {
    const { dataValues } = record
    setLog({
        tableName: Quota.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: typeOperationLog.INSERT,
        descriptionOperation: dataValues.description_operation,
        idUser: dataValues.idUser,
    })
})

module.exports = Customer