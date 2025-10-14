const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const User = require('../../user/db/user_model');
const Customer = require('../../customer/db/customer_model');
const PaymentFrequency = require('../../utils/db/payment_frequency_model');
const PaymentMethod = require('../../utils/db/payment_method_model');
const { typeOperationLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');

class Loan extends Model { }

Loan.init(
    {
        id_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_payment_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ganancy: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        id_payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        observation: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        id_state_loan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        evidence: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description_operation: {
            type: DataTypes.VIRTUAL,
        },
        idUser: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Loan',
    },
);

const sync = async () => await Loan.sync({ alter: false })
sync()

Loan.belongsTo(User, {
    foreignKey: {
        name: 'id_user',
        allowNull: false,
    }
})
Loan.belongsTo(Customer, { 
    foreignKey: {
        name: 'id_customer',
        allowNull: false,
    }
})
Loan.belongsTo(PaymentFrequency, { 
    foreignKey: {
        name: 'id_payment_frequency',
        allowNull: false,
    }
})
Loan.belongsTo(PaymentMethod, { foreignKey: 'id_payment_method', })

Loan.afterCreate(async (record, options) => {
    const { dataValues } = record
    setLog({
        tableName: Loan.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: typeOperationLog.INSERT,
        descriptionOperation: dataValues.description_operation,
        idUser: dataValues.idUser,
    })
})

module.exports = Loan