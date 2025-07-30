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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
    },
    {
        paranoid: true,
        sequelize,
        modelName: 'User',
    },
);

(async () => {
    await User.sync({ alter: false, })
        .then(async () => {
            const size = await User.count()
            if (size > 0) return
            await User.bulkCreate(defaultUsers)
        })
})();

module.exports = User