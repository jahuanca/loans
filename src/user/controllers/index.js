const createUserController = require("./create_user");
const getUsersController = require("./get_users");
const updateUserController = require("./update_user");
const deleteUserController = require("./delete_user");
const updatePasswordController = require("./update_password");

module.exports = {
    getUsersController,
    createUserController,
    updateUserController,
    updatePasswordController,
    deleteUserController,
}