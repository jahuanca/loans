const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../utils/db/connection");
const { typeMovements } = require("../../utils/core/default_values");

class CapitalMovements extends Model {
    static associate(models) {
        CapitalMovements.belongsTo(models.User, {
            foreignKey: {
                name: 'idUser',
                as: 'user',
                allowNull: false,
            }
        })

        CapitalMovements.belongsTo(models.Loan, {
            foreignKey: {
                name: 'idLoan',
                allowNull: true,
                as: 'loan',
            }
        })
    }
}

CapitalMovements.init({
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    idLoan: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    type: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
    // INGRESO O EGRESO
    description: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    // INGRESO POR CUOTA PAGADA #120 DE PRESTAMO #12
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    ganancy: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    },
}, {
    paranoid: true,
    sequelize,
    modelName: 'CapitalMovements',
        tableName: 'capital_movements',
        underscored: true,
})

module.exports = CapitalMovements