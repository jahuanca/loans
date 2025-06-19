const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { defaultPaymentFrequency } = require('../core/default_values');

class PaymentFrequency extends Model { }

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
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Payment_Frequency',
    },
);

(async () => {
    await PaymentFrequency.sync({ force: false,  })
        .then(async () => {
            const size= await PaymentFrequency.count()
            if(size > 0) return;
            await PaymentFrequency.bulkCreate(
                defaultPaymentFrequency
            )
        })
})();

module.exports = PaymentFrequency