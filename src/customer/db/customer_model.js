const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const ActivityLog = require('../../utils/db/activity_log_model');

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
        user: {
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

Customer.afterCreate( async (record, options)=> {
    const { dataValues } = record
    await ActivityLog.create({
        id_user: dataValues.idUser,
        new_registry: dataValues,
        old_registry: null,
        type_operation: 'I',
        description_operation: 'Creo un nuevo cliente',
    })
})

module.exports = Customer