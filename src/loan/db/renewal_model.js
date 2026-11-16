const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../../utils/db/connection');
class Renewal extends Model {
    static associate(models) {
        Renewal.belongsTo(models.Customer, {
            foreignKey: {
                name: 'idCustomer',
                allowNull: false,
            }
        })

        Renewal.belongsTo(models.User, {
            foreignKey: {
                name: 'idUser',
                allowNull: false,
            }
        })

        Renewal.belongsTo(models.Loan, {
            foreignKey: {
                name: 'idPreviousLoan',
                allowNull: true,
            }
        })

        Renewal.belongsTo(models.Loan, {
            foreignKey: {
                name: 'idNewLoan',
                allowNull: false,
            }
        })

    }
}

Renewal.init({
    idCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPreviousLoan: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idNewLoan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    },
    variationInAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    idTypeRenewal: {
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