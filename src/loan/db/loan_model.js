const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const User = require('../../user/db/user_model');
const Customer = require('../../customer/db/customer_model');
const PaymentFrequency = require('../../utils/db/payment_frequency_model');
const PaymentMethod = require('../../utils/db/payment_method_model');

class Loan extends Model { }

Loan.init(
    {
        id_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_payment_frequency: {
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
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ganancy: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        id_payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        observation: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        id_state_loan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        evidence: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'Loan',
    },
);

(async () => {
    await Loan.sync({force: false,})
})();

Loan.belongsTo(User, {foreignKey: 'id_user',})
Loan.belongsTo(Customer, {foreignKey: 'id_customer',})
Loan.belongsTo(PaymentFrequency, {foreignKey: 'id_payment_frequency',})
Loan.belongsTo(PaymentMethod, {foreignKey: 'id_payment_method',})


module.exports = Loan