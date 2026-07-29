const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');
const TypeCustomer = require('./type_customer_model');
const Loan = require('../../loan/db/loan_model');

class Customer extends Model { }

Customer.init(
    {
        id_type_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
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
        phone: {
            type: DataTypes.STRING(9),
            allowNull: true,
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
)

Customer.belongsTo(TypeCustomer, {
    foreignKey: {
        name: 'id_type_customer',
        allowNull: false,
    }
})

Customer.hasMany(Loan, {
    foreignKey: {
        name: 'id_customer',
        allowNull: false,
    }
})

Loan.belongsTo(Customer, { 
    foreignKey: {
        name: 'id_customer',
        allowNull: false,
    }
})

Customer.afterCreate(async (record, options) => {
    const { dataValues } = record
    await setLog({
        tableName: Customer.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: typeOperationLog.INSERT,
        descriptionOperation: dataValues.description_operation,
        idUser: dataValues.idUser,
    })
    // TODO: poner esto en un try catch
})

module.exports = Customer