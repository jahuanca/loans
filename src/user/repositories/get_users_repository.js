const User = require("../db/user_model");

const getUsersRepository = () => User.findAll()

module.exports = getUsersRepository