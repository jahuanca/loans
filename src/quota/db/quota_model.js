const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const Loan = require('../../loan/db/loan_model');

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
        }
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Quota',
    },
);

(async () => {
    await Quota.sync({force: false,})
})();

Quota.belongsTo(Loan, {foreignKey: 'id_loan',})

module.exports = Quota