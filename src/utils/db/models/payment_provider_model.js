const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connection');
const { paymentProviderCategories } = require('../../core/default_values');

class PaymentProvider extends Model {
    static associate(models) {
        PaymentProvider.hasMany(models.CustomerPaymentAccount, {
            foreignKey: {
                name: 'idPaymentProvider',
                allowNull: false,
            }
        })
    }
}

PaymentProvider.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isIn: [Object.values(paymentProviderCategories)],
            },
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'PaymentProvider',
        tableName: 'payment_providers',
        underscored: true,
    },
);

module.exports = PaymentProvider
