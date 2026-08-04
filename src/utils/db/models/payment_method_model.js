const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connection');
const { defaultPaymentMethod } = require('../../core/default_values');

class PaymentMethod extends Model { }

PaymentMethod.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Payment_Method',
    },
);

module.exports = PaymentMethod