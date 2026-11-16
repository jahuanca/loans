const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog } = require('../../utils/core/default_values');
const { INSERT, UPDATE, } = typeOperationLog
const { setLog } = require('../../utils/db/utils');

class Customer extends Model {
    static associate(models) {
        Customer.belongsTo(models.TypeCustomer, {
            foreignKey: {
                name: 'idTypeCustomer',
                allowNull: false,
            }
        })

        Customer.belongsTo(models.User, {
            foreignKey: {
                name: 'idAssignedRecoveryAgent',
                allowNull: false,
            }
        })

        Customer.hasMany(models.CustomerPaymentAccount, {
            foreignKey: {
                name: 'idCustomer',
                allowNull: false,
            }
        })

        Customer.hasMany(models.Loan, {
            foreignKey: {
                name: 'idCustomer',
                allowNull: false,
            }
        })
    }
}

Customer.init(
    {
        idTypeCustomer: {
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
            validate: { is: /^9\d{8}$/ },
        },
        latitude: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        idTypeDocument: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        document: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        idAssignedRecoveryAgent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descriptionOperation: {
            type: DataTypes.VIRTUAL,
        },
        idUser: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        underscored: true,
    },
)

Customer.afterCreate(async (record, options) => {
    const { dataValues } = record
    const { idUser, descriptionOperation } = dataValues
    await setLog({
        tableName: Customer.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: INSERT,
        descriptionOperation: descriptionOperation,
        idUser: idUser,
    })
    // TODO: poner esto en un try catch
})

Customer.afterUpdate(async (record, options) => {
    const { dataValues, _previousDataValues } = record
    const { idUser, descriptionOperation } = dataValues
    await setLog({
        tableName: Customer.tableName,
        newValues: dataValues,
        oldValues: _previousDataValues,
        typeOperation: UPDATE,
        descriptionOperation: descriptionOperation,
        idUser: idUser,
    }) 
    // TODO: poner esto en un try catch
})

module.exports = Customer