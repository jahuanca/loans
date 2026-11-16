const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connection');
const { defaultPaymentFrequency } = require('../../core/default_values');
const TypeCustomer = require('../../../customer/db/type_customer_model');

class PaymentFrequency extends Model {

    static associate(models) {
        PaymentFrequency.belongsTo(models.TypeCustomer, {
            foreignKey: {
                name: 'idTypeCustomer',
                allowNull: false,
                defaultValue: 1,
            }
        })
    }
}

PaymentFrequency.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        recommendedPercentage: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        monthlyInstallments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        daysInstallment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idTypeCustomer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'PaymentFrequency',
        tableName: 'payment_frequencies',
        underscored: true,
    },
)

module.exports = PaymentFrequency