// Configuracion para sequelize-cli. Lee las mismas variables que src/utils/db/connection.js
const {
    hostDatabase,
    databaseName,
    usernameDatabase,
    passwordDatabase,
    dialectDatabase,
} = process.env

const base = {
    host: hostDatabase,
    database: databaseName,
    username: usernameDatabase,
    password: passwordDatabase,
    dialect: dialectDatabase,
    logging: false,
}

module.exports = {
    development: base,
    test: base,
    production: base,
}
