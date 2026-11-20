const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');

class Loan extends Model {
    static associate(models) {

        Loan.belongsTo(models.User, {
            foreignKey: {
                name: 'idUser',
                allowNull: false,
            }
        })

        Loan.belongsTo(models.PaymentFrequency, {
            foreignKey: {
                name: 'idPaymentFrequency',
                allowNull: false,
            }
        })

        Loan.belongsTo(models.PaymentMethod, { foreignKey: 'idPaymentMethod', })

        Loan.hasMany(models.Quota, {
            foreignKey: {
                name: 'idLoan',
                allowNull: false,
            }
        })

        Loan.belongsTo(models.Customer, {
            foreignKey: {
                name: 'idCustomer',
                allowNull: false,
            }
        })
    }
}

Loan.init(
    {
        idCustomer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPaymentFrequency: {
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
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ganancy: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        idPaymentMethod: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numberOfInstallments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        daysBetweenInstallments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        observation: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        idStateLoan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        evidence: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'Loan',
        tableName: 'loans',
        underscored: true,
    },
)

Loan.afterCreate(async (record, options) => {
    const { dataValues } = record
    const { descriptionOperation, idUserOfOperation } = dataValues
    setLog({
        tableName: Loan.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: typeOperationLog.INSERT,
        descriptionOperation: descriptionOperation,
        idUserOfOperation: idUserOfOperation,
    })
})

module.exports = Loan