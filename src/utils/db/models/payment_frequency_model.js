const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connection');
const { defaultPaymentFrequency } = require('../../core/default_values');
const TypeCustomer = require('../../../customer/db/type_customer_model');

class PaymentFrequency extends Model {

    static associate(models) {
        PaymentFrequency.belongsTo(models.Type_Customer, {
            foreignKey: {
                name: 'id_type_customer',
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
        recommended_percentage: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        monthly_installments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        days_installment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_type_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Payment_Frequency',
    },
)

module.exports = PaymentFrequency