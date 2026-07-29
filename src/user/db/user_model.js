const crypto = require('node:crypto')
const { secretSalt } = process.env
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { defaultUsers } = require('../../utils/core/default_values');

class User extends Model { }

User.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false, 
            get() {
                return () => this.getDataValue('password')
            }
        },
        phoneNumber: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                return () => this.getDataValue('salt')
            }
        },
        validationCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isValidated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'User',
        defaultScope: {
            attributes: {
                exclude: ['password', 'validationCode']
            }
        }
    },
);

User.generateSalt = () => crypto.randomBytes(16).toString('base64')

User.encryptPassword = (newPassword, salt) => crypto.createHash('RSA-SHA256')
    .update(newPassword)
    .update(secretSalt)
    .update(salt)
    .digest('hex')

User.prototype.correctPassword = function(valueToCheck) {
    return User.encryptPassword(valueToCheck, this.salt()) === this.password()
}

const setValuesOfBeforeCreateOrUpdate = (user, options) => {
    if (user.changed('email')) {
        user.isValidated = false
    }

    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate('setSaltAndPassword', setValuesOfBeforeCreateOrUpdate)
User.beforeUpdate('refreshSaltAndPassword', setValuesOfBeforeCreateOrUpdate)

module.exports = User