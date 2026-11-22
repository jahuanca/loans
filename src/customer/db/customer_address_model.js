const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog, customerAddressTypes } = require('../../utils/core/default_values');
const { INSERT, UPDATE, } = typeOperationLog
const { setLog } = require('../../utils/db/utils');

class CustomerAddress extends Model {
    static associate(models) {
        CustomerAddress.belongsTo(models.Customer, {
            foreignKey: {
                name: 'idCustomer',
                allowNull: false,
            }
        })
    }
}

CustomerAddress.init(
    {
        idCustomer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // HOME, BUSINESS, FAMILY u OTHER (ver customerAddressTypes)
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [Object.values(customerAddressTypes)] },
        },
        address: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        reference: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        // DECIMAL(9,6): ~10 cm de precision. Postgres lo devuelve como string.
        latitude: {
            type: DataTypes.DECIMAL(9, 6),
            allowNull: true,
            validate: { min: -90, max: 90 },
        },
        longitude: {
            type: DataTypes.DECIMAL(9, 6),
            allowNull: true,
            validate: { min: -180, max: 180 },
        },
        // Clave o URL del archivo en el storage (nunca el binario). Obligatoria.
        image: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: { notEmpty: true },
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        descriptionOperation: {
            type: DataTypes.VIRTUAL,
        },
        idUserOfOperation: {
            type: DataTypes.VIRTUAL,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'CustomerAddress',
        tableName: 'customer_addresses',
        underscored: true,
        validate: {
            // Latitud y longitud van juntas: las dos o ninguna.
            hasBothCoordinates() {
                const hasLatitude = this.latitude !== null && this.latitude !== undefined
                const hasLongitude = this.longitude !== null && this.longitude !== undefined
                if (hasLatitude !== hasLongitude) {
                    throw new Error('Latitud y longitud deben enviarse juntas')
                }
            },
        },
    },
)

CustomerAddress.afterCreate(async (record) => {
    const { dataValues } = record
    const { idUserOfOperation, descriptionOperation } = dataValues
    await setLog({
        tableName: CustomerAddress.tableName,
        newValues: dataValues,
        oldValues: null,
        typeOperation: INSERT,
        descriptionOperation: descriptionOperation,
        idUserOfOperation: idUserOfOperation,
    })
})

CustomerAddress.afterUpdate(async (record) => {
    const { dataValues, _previousDataValues } = record
    const { idUserOfOperation, descriptionOperation } = dataValues
    await setLog({
        tableName: CustomerAddress.tableName,
        newValues: dataValues,
        oldValues: _previousDataValues,
        typeOperation: UPDATE,
        descriptionOperation: descriptionOperation,
        idUserOfOperation: idUserOfOperation,
    })
})

module.exports = CustomerAddress
