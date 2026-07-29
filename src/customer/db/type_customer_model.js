const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('./../..//utils/db/connection')
const { defaultCustomers } = require("../../utils/core/default_values");

class TypeCustomer extends Model {}

TypeCustomer.init({
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    paranoid: true,
    sequelize,
    modelName: 'Type_Customer',
})

module.exports = TypeCustomer