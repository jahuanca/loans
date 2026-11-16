const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const Loan = require('../../loan/db/loan_model');
const { typeOperationLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');

class Quota extends Model {

    static associate(models) {
        Quota.belongsTo(models.Loan, {
            foreignKey: {
                name: 'idLoan',
                allowNull: false,
            },
        })
    }
}

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
        idLoan: {
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
        dateToPay: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        paidDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        amountDelinquency: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        idStateQuota: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isLast: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        descriptionOperation: {
            type: DataTypes.VIRTUAL,
        },
        idUserOfOperation: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Quota',
        tableName: 'quotas',
        underscored: true,
    },
);

Quota.afterUpdate((record, options) => {
    const {
        dataValues,
        _previousDataValues,
    } = record

    const {
        descriptionOperation,
        idUser,
    } = dataValues

    setLog({
        tableName: Quota.tableName,
        newValues: dataValues,
        oldValues: _previousDataValues,
        typeOperation: typeOperationLog.UPDATE,
        descriptionOperation: descriptionOperation,
        idUser: idUser,
    })
})

module.exports = Quota