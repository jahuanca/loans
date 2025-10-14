const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { defaultUsers } = require('../../utils/core/default_values');
const crypto = require('crypto')

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
        },
        phoneNumber: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
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
    },
);

const sync = async () => {
    await User.sync({ alter: false, })
        .then(async () => {
            const size = await User.count()
            if (size > 0) return
            await User.bulkCreate(defaultUsers)
        })
}

sync()

User.generateSalt = () => crypto.randomBytes(16).toString('base64')

User.encryptPassword = (plaintText, salt) => crypto.createHash('RSA-SHA256')
    .update(plaintText)
    .update(salt)
    .digest('hex')

User.prototype.correctPassword = (fullPassword) => {
    return User.encryptPassword(fullPassword, this.salt() === this.password())
}

const setSaltAndPassword = (user, options) => {
    if (user.changed('email')) {
        user.isValidated = false
    }

    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate('setSaltAndPassword', setSaltAndPassword)
User.beforeUpdate('refreshSaltAndPassword', setSaltAndPassword)

module.exports = User