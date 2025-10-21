const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../../utils/db/connection'); 
const Loan = require("./loan_model");
const { typeRenewal } = require("../../utils/core/default_values");
const User = require("../../user/db/user_model");
const Customer = require("../../customer/db/customer_model");

class Renewal extends Model { }

Renewal.init({
    id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_previous_loan: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_new_loan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    },
    variation_in_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    id_type_renewal: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: Object.values(typeRenewal),
        },
    },
    observation: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
}, {
    paranoid: true,
    sequelize,
    modelName: 'Renewal',
})

const sync = async () => await Renewal.sync({ alter: false })
sync()

Renewal.belongsTo(Customer, {
    foreignKey: {
        name: 'id_customer',
        allowNull: false,
    }
})

Renewal.belongsTo(User, {
    foreignKey: {
        name: 'id_user',
        allowNull: false,
    }
})

Renewal.belongsTo(Loan, {
    foreignKey: {
        name: 'id_previous_loan',
        allowNull: true,
    }
})

Renewal.belongsTo(Loan, {
    foreignKey: {
        name: 'id_new_loan',
        allowNull: false,
    }
})

module.exports = Renewal