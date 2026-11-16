const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../../utils/db/connection');
class Renewal extends Model {
    static associate(models) {
        Renewal.belongsTo(models.Customer, {
            foreignKey: {
                name: 'id_customer',
                allowNull: false,
            }
        })

        Renewal.belongsTo(models.User, {
            foreignKey: {
                name: 'id_user',
                allowNull: false,
            }
        })

        Renewal.belongsTo(models.Loan, {
            foreignKey: {
                name: 'id_previous_loan',
                allowNull: true,
            }
        })

        Renewal.belongsTo(models.Loan, {
            foreignKey: {
                name: 'id_new_loan',
                allowNull: false,
            }
        })

    }
}

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
    },
    observation: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
}, {
    paranoid: true,
    sequelize,
    modelName: 'Renewal',
    tableName: 'renewals',
    underscored: true,
})

module.exports = Renewal