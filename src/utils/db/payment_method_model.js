const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { defaultPaymentMethod } = require('../core/default_values');

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

(async () => {
    await PaymentMethod.sync({ force: false, })
        .then(async () => {
            const size = await PaymentMethod.count()
            if (size > 0) return;
            await PaymentMethod.bulkCreate(
                defaultPaymentMethod
            )
        })
})();

module.exports = PaymentMethod