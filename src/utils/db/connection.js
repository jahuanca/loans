const Sequelize = require('sequelize');
const { errorConnectionString } = require('../core/strings');
const {
    hostDatabase,
    databaseName,
    usernameDatabase,
    passwordDatabase,
    dialectDatabase,
} = process.env

const sequelize = new Sequelize(databaseName, usernameDatabase, passwordDatabase, {
    host: hostDatabase,
    dialect: dialectDatabase,
    logging: false,
})

const startConnection = async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.error(errorConnectionString)
    }
};

const closeConnection = async () => await sequelize.close();

module.exports = {
    startConnection,
    closeConnection,
    sequelize,
}