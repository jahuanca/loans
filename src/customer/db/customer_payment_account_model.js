const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog } = require('../../utils/core/default_values');
const { INSERT, UPDATE, } = typeOperationLog
const { setLog } = require('../../utils/db/utils');

class CustomerPaymentAccount extends Model {
    static associate(models) {
        CustomerPaymentAccount.belongsTo(models.Customer, {
            foreignKey: {
                name: 'idCustomer',
                allowNull: false,
            }
        })

        CustomerPaymentAccount.belongsTo(models.PaymentProvider, {
            foreignKey: {
                name: 'idPaymentProvider',
                allowNull: false,
            }
        })
    }
}

CustomerPaymentAccount.init(
    {
        idCustomer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPaymentProvider: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Solo para categoria BANK
        accountNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: { is: /^\d{10,20}$/ },
        },
        // Solo para categoria BANK: Codigo de Cuenta Interbancario (20 digitos)
        cci: {
            type: DataTypes.CHAR(20),
            allowNull: true,
            validate: { is: /^\d{20}$/ },
        },
        // Solo para categoria WALLET
        phone: {
            type: DataTypes.STRING(9),
            allowNull: true,
            validate: { is: /^9\d{8}$/ },
        },
        // titular de la cuenta
        holderName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        observation: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        descriptionOperation: {
            type: DataTypes.VIRTUAL,
        },
        idUser: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'CustomerPaymentAccount',
        tableName: 'customer_payment_accounts',
        underscored: true,
        validate: {
            // Que campos exige cada categoria se valida en el use case,
            // porque depende del proveedor. Aqui solo se exige al menos un identificador.
            hasIdentifier() {
                if (!this.cci && !this.accountNumber && !this.phone) {
                    throw new Error('La cuenta debe tener CCI, numero de cuenta o telefono')
                }
            },
        },
    },
)

CustomerPaymentAccount.afterCreate(async (record) => {
    const { dataValues } = record
    const { idUserOfOperation, descriptionOperation } = dataValues
    await setLog({
        tableName: CustomerPaymentAccount.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: INSERT,
        descriptionOperation: descriptionOperation,
        idUidUserOfOperationser: idUserOfOperation,
    })
})

CustomerPaymentAccount.afterUpdate(async (record) => {
    const { dataValues, _previousDataValues } = record
    const { idUserOfOperation, descriptionOperation } = dataValues
    await setLog({
        tableName: CustomerPaymentAccount.tableName,
        newValues: dataValues,
        oldValues: _previousDataValues,
        typeOperation: UPDATE,
        descriptionOperation: descriptionOperation,
        idUserOfOperation: idUserOfOperation,
    })
})

module.exports = CustomerPaymentAccount
