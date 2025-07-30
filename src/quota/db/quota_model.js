const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const Loan = require('../../loan/db/loan_model');
const { operationsOfLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');

class Quota extends Model { }

Quota.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        id_loan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        ganancy: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        date_to_pay: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        paid_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        amount_delinquency: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id_state_quota: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description_operation: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Quota',
    },
);

const sync = async () => await Quota.sync({ alter: false, })
sync()

Quota.belongsTo(Loan, { foreignKey: 'id_loan', })

Quota.afterUpdate((record, options) => {
    const {
        dataValues,
        _previousDataValues,
    } = record

    setLog({
        tableName: Quota.tableName,
        newValues: dataValues,
        oldValues: _previousDataValues,
        typeOperation: operationsOfLog.UPDATE,
        descriptionOperation: dataValues.description_operation,
    })
})

module.exports = Quota